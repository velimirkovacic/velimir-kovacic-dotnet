using System.Security.Claims;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly SubjectService _subjectService;
        private readonly ProfessorService _professorService;
        public SubjectController(SubjectService SubjectService, ProfessorService ProfessorService) {
            _subjectService = SubjectService;
            _professorService = ProfessorService;
        }


        [Authorize]
        [HttpPost("subject")]
        public async Task<IActionResult> Post(Subject newSubject)
        {

            string Id = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            Professor professor = await _professorService.GetAsyncId(Id);

            //return Ok(new { prof = professor });

            if (professor.Subjects.Count + 1 > 3)
            {
                return BadRequest(new { success = false, message = "Too many subjects" });
            } 

            if (ModelState.IsValid)
            {
                if(await _subjectService.CountAsyncUrl(newSubject.Url) == 0 &&
                    await _subjectService.CountAsyncTitle(newSubject.Title) == 0)
                {
                    await _subjectService.CreateAsync(newSubject);
                    professor.Subjects = professor.Subjects.Append(newSubject.Id).ToList();
                    await _professorService.UpdateAsync(Id, professor);
                    var response = new { success = true, message = "Creation Successful" };
                    
                    return Created(string.Empty, response);
                }
                else
                {
                    return BadRequest(new { success = false, message = "Url or Title not unique" });
                }
                
            }
            var response2 = new { success = false, message = "Creation Failed" };
            return BadRequest(response2);
        }

        [HttpGet]
        [Route("subjects")]
        public async Task<IActionResult> Get()
        {
            var Subjects = await _subjectService.GetAsync();


            var response2 = new { success = true, subjects = Subjects, message = "Query successful" };
            return Ok(response2);
        }

        [Authorize]
        [HttpGet("[controller]/{url}")]
        public async Task<IActionResult> Get(string url)
        {
            var Subject = await _subjectService.GetAsync(url);

            if (Subject is null)
            {
                var response = new { success = false, message = "Not found" };
                return BadRequest(response);
            }

            var targetSubject = Subject[0];
            var professors = await _professorService.GetAsyncBySubject(targetSubject.Url);


            var response2 = new { success = true, subject = targetSubject, professors = professors, message = "Query successful" };
            return Ok(response2);
        }

    }
}

