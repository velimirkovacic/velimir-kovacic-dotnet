using System;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : Controller
    {
        private readonly StudentService _studentService;
        private readonly ProfessorService _professorService;

        public RegisterController(StudentService StudentService, ProfessorService ProfessorService) {
            _studentService = StudentService;
            _professorService = ProfessorService;
                }


        [HttpPost("student")]
        public async Task<IActionResult> Post(Student newStudent)
        {

            if (ModelState.IsValid)
            {
                await _studentService.CreateAsync(newStudent);

                var response = new { success = true, message = "Registration Successful" };
                return Ok(response);
            }
            var response2 = new { success = false, message = "Registration Failed" };
            return BadRequest(response2);
        }

        [HttpPost("professor")]
        public async Task<IActionResult> Post(Professor professor)
        {

            if (ModelState.IsValid)
            {
                await _professorService.CreateAsync(professor);

                var response = new { success = true, message = "Registration Successful" };
                return Ok(response);
            }
            var response2 = new { success = false, message = "Registration Failed" };
            return BadRequest(response2);
        }
    }
}
