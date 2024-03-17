using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentService _studentService;

        public StudentController(StudentService StudentService) =>
            _studentService = StudentService;




        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Student>> Get()
        {
            var students = await _studentService.GetAsync();


            var response2 = new { success = true, students = students, message = "Query successful" };
            return Ok(response2);
        }

        [Authorize]
        [HttpGet("email")]
        public async Task<ActionResult<Student>> Get(EmailRequestModel email)
        {
         var student = await _studentService.GetAsync(email.Email);

            if (student is null)
            {
                var response = new { success = false, message = "Not found" };
                return BadRequest(response);
            }


            var response2 = new { success = true, student=student, message = "Query successful" };
            return Ok(response2);
        }

    }
}
