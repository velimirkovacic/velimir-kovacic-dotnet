using System.Security.Claims;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;


namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructionController : ControllerBase
    {
        private readonly InstructionService _instructionService;

        public InstructionController(InstructionService InstructionService) =>
            _instructionService = InstructionService;


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(Instruction newInstruction)
        {
            string studentId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            newInstruction.studentId = studentId;
       
            if (ModelState.IsValid)
            {

                    await _instructionService.CreateAsync(newInstruction);

                    var response = new { success = true, message = "Creation Successful" };
                    return Ok(response);
                

            }
            var response2 = new { success = false, message = "Creation Failed" };
            return BadRequest(response2);
        }
    }
}
