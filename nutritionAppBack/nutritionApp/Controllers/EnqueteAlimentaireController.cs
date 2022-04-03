using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using nutritionApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nutritionApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnqueteAlimentaireController : ControllerBase
    {
        private readonly nutritionAppContext _context;

        public EnqueteAlimentaireController(nutritionAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResultatEnquete>>> GetResEnqueteAlimentaire()
        {
            return await _context.ResultatEnquetes.ToListAsync();
        }

        [HttpGet("PatientId/{maladeId}")]
        public async Task<ActionResult<ResultatEnquete>> GetResEnqueteAlimentaireByMaladeid(int maladeId)
        {
            var resultatEnquete = _context.ResultatEnquetes.Where(u => u.EnqAlimIdPatient == maladeId).FirstOrDefault();

            if (resultatEnquete == null)
            {
                return NotFound();
            }
            return resultatEnquete;
        }

        [HttpPost]
        public async Task<ActionResult<ResultatEnquete>> PostResEnqueteAlimentaire(ResultatEnquete resEnquete)
        {
            int count = _context.ResultatEnquetes.Where(o => o.EnqAlimIdPatient == resEnquete.EnqAlimIdPatient).Count();

            if (count == 0)
            {
                _context.ResultatEnquetes.Add(resEnquete);
                await _context.SaveChangesAsync();
                return CreatedAtAction("PostResEnqueteAlimentaire", new { id = resEnquete.EnqAlimId }, resEnquete);
            }
            else
            {
                return BadRequest(new
                {
                    StatusCodes = 404,
                    Message = "Ce patient possede deja une enquete alimentaire"
                });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveResultatEnqueteAlimentaire(long id)
        {

            var resEnquete = _context.ResultatEnquetes.Where(o => o.EnqAlimIdPatient == id).FirstOrDefault();

            if (resEnquete == null)
            {
                return NotFound();
            }
            _context.ResultatEnquetes.Remove(resEnquete);
            await _context.SaveChangesAsync();
            return NoContent();
        }





    }
}
