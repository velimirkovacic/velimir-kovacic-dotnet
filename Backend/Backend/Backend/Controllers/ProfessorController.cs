using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfessorController : ControllerBase
    {
        private readonly ProfessorService _ProfessorService;

        public ProfessorController(ProfessorService ProfessorService) =>
            _ProfessorService = ProfessorService;




        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Professor>> Get()
        {
            var Professors = await _ProfessorService.GetAsync();


            var response2 = new { success = true, professors = Professors, message = "Query successful" };
            return Ok(response2);
        }

        [Authorize]
        [HttpGet("email")]
        public async Task<ActionResult<Professor>> Get(EmailRequestModel email)
        {
            var Professor = await _ProfessorService.GetAsync(email.Email);

            if (Professor is null)
            {
                var response = new { success = false, message = "Not found" };
                return BadRequest(response);
            }


            var response2 = new { success = true, professor = Professor, message = "Query successful" };
            return Ok(response2);
        }

    }
}