using System.Security.Claims;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;


namespace Backend.Controllers
{
    [Route("api/instructions")]
    [ApiController]
    public class InstructionController : ControllerBase
    {
        private readonly InstructionService _instructionService;
        private readonly ProfessorService _professorService;
        private readonly StudentService _studentService;

        public InstructionController(InstructionService InstructionService, ProfessorService ProfessorService, StudentService StudentService) {
            _instructionService = InstructionService;
            _professorService = ProfessorService;
            _studentService = StudentService;

        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(Instruction newInstruction)
        {
            string studentId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            newInstruction.studentId = studentId;


       
            if (ModelState.IsValid)
            {

                    await _instructionService.CreateAsync(newInstruction);

                    var response = new { dt = newInstruction.dateTime, success = true, message = "Creation Successful" };
                    return Ok(response);
                

            }
            var response2 = new { success = false, message = "Creation Failed" };
            return BadRequest(response2);
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            string Id = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var professor = _professorService.GetAsyncId(Id).Result;
            if (professor != null)
            {
                var past = _instructionService.GetPastByIdProf(Id).Result.Select(x => x.studentId);
                var future = _instructionService.GetPastByIdProf(Id).Result.Select(x => x.studentId);
                //return Ok(new { msg = past });

                var studentsPast = past.Select(async x => await _studentService.GetAsyncId(x)).Select(t => t.Result).ToList();
                var studentsFuture = future.Select(async x => await _studentService.GetAsyncId(x)).Select(t => t.Result).ToList();

                var res = new { success = true, pastInstructions = studentsPast, upcomingInstructions = new List<Instruction>(), sentInstructionRequests = studentsFuture, message = "Success (stud)" };
                return Ok(res);
            }
            else
            {
                var student = _studentService.GetAsyncId(Id).Result;
                var past = _instructionService.GetPastByIdStudent(Id).Result.Select(x => x.professorId);
                var future = _instructionService.GetPastByIdStudent(Id).Result.Select(x => x.professorId);
                //return Ok(new { msg = past });

                var professorsPast = past.Select(async x => await _professorService.GetAsyncId(x)).Select(t => t.Result).ToList();
                var professorsFuture = future.Select( async x => await _professorService.GetAsyncId(x)).Select(t => t.Result).ToList();

                var res = new { success = true, pastInstructions = professorsPast, upcomingInstructions = new List<Instruction>(), sentInstructionRequests = professorsFuture, message = "Success (stud)" };
                return Ok(res);
            }

            
        }

    }
}

// pastInstructions
// upcomingInstructions
// sentInstructionRequests
