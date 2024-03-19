using System;
using System.Net;
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
        public async Task<IActionResult> Post([FromForm] Student newStudent)
        {

            if (ModelState.IsValid)
            {
                var professor = _professorService.GetAsync(newStudent.Email).Result;
                var student = _studentService.GetAsync(newStudent.Email).Result;
                if (professor == null && student == null)
                {
                    await _studentService.CreateAsync(newStudent);

                    var response = new { success = true, message = "Registration Successful" };
                    return Created(string.Empty, response);
                }
                
                
            }
            var response2 = new { success = false, message = "Registration Failed" };
            return BadRequest(response2);
        }

        [HttpPost("professor")]
        public async Task<IActionResult> Post([FromForm] Professor newProfessor)
        {

            if (ModelState.IsValid)
            {
                var professor = _professorService.GetAsync(newProfessor.Email).Result;
                var student = _studentService.GetAsync(newProfessor.Email).Result;
                if (professor == null && student == null)
                {
                    await _professorService.CreateAsync(newProfessor);

                    var response = new { success = true, message = "Registration Successful" };
                    return Created(string.Empty, response);
                }
            }
            var response2 = new { success = false, message = "Registration Failed" };
            return BadRequest(response2);
        }
    }
}
