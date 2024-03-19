using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentService _studentService;

        public StudentController(StudentService StudentService) =>
            _studentService = StudentService;




        [HttpGet("students")]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var students = await _studentService.GetAsync();


            var response2 = new { success = true, students = students, message = "Query successful" };
            return Ok(response2);
        }

        [Authorize]
        [HttpGet("[controller]/{email}")]
        public async Task<IActionResult> Get(string email)
        {
         var student = await _studentService.GetAsync(email);

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
