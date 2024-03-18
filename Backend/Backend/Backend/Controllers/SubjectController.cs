using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly SubjectService _subjectService;

        public SubjectController(SubjectService SubjectService) =>
            _subjectService = SubjectService;


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(Subject newSubject)
        {

            if (ModelState.IsValid)
            {
                if(await _subjectService.CountAsyncUrl(newSubject.Url) > 0 &&
                    await _subjectService.CountAsyncTitle(newSubject.Title) > 0)
                {
                    await _subjectService.CreateAsync(newSubject);

                    var response = new { success = true, message = "Creation Successful" };
                    return Ok(response);
                }
                
            }
            var response2 = new { success = false, message = "Creation Failed" };
            return BadRequest(response2);
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Subject>> Get()
        {
            var Subjects = await _subjectService.GetAsync();


            var response2 = new { success = true, Subjects = Subjects, message = "Query successful" };
            return Ok(response2);
        }

        [Authorize]
        [HttpGet("{url}")]
        public async Task<ActionResult<Subject>> Get(string url)
        {
            var Subject = await _subjectService.GetAsync(url);

            if (Subject is null)
            {
                var response = new { success = false, message = "Not found" };
                return BadRequest(response);
            }


            var response2 = new { success = true, Subject = Subject, message = "Query successful" };
            return Ok(response2);
        }

    }
}

