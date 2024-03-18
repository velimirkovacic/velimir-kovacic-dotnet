using System;
using System.Security.Claims;
using System.Text;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Web.Http.Cors;


namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly StudentService _studentService;
        private readonly ProfessorService _professorService;
        private readonly IConfiguration _configuration;

        public LoginController(StudentService StudentService, ProfessorService ProfessorService, IConfiguration configuration)
        {
            _studentService = StudentService;
            _professorService = ProfessorService;
            _configuration = configuration;
        }
       

        public async Task<List<Student>> Get() =>
            await _studentService.GetAsync();

        [HttpPost("student")]
        public async Task<IActionResult> Post(StudentLoginModel loginModel)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(new { success = false, message = "Login Failed" });
            }

            Student? student = await _studentService.GetAsync(loginModel.Email, loginModel.Password);

            if (student == null)
            {
                return Unauthorized(new { success = false, message = "Authentication failed. User not found." });
            }

            var token = GenerateJwtToken(student);

            var response = new
            {
                success = true,
                message = "Login successful",
                student = student,
                token = token
            };

            return Ok(response);
        }


        [HttpPost("professor")]
        public async Task<IActionResult> Post(ProfessorLoginModel loginModel)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(new { success = false, message = "Login Failed" });
            }

            Professor? professor = await _professorService.GetAsync(loginModel.Email, loginModel.Password);

            if (professor == null)
            {
                return Unauthorized(new { success = false, message = "Authentication failed. User not found." });
            }

            var token = GenerateJwtToken(professor);

            var response = new
            {
                success = true,
                message = "Login successful",
                professor = professor,
                token = token
            };

            return Ok(response);
        }

        private string GenerateJwtToken(Student student)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,student.Id),
                new Claim(ClaimTypes.Email,student.Email)
            };
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        private string GenerateJwtToken(Professor professor)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, professor.Email)
            };
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}

