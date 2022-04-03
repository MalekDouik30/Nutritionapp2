using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using nutritionApp.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace nutritionApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DossierPatientController : ControllerBase
    {
        private readonly nutritionAppContext _context;

        public DossierPatientController(nutritionAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DossierPatient>>> GetDossierPatient()
        {
            return await _context.DossierPatients.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DossierPatient>> GetDossierPatient(int id)
        {
            var dossierpatient = await _context.DossierPatients.FindAsync(id);
            if (dossierpatient == null)
            {
                return NotFound();
            }
            return dossierpatient;
        }


        [HttpGet("PatientId/{maladeId}")]
        public async Task<ActionResult<DossierPatient>> GetDossierPatientByMaladeid(int maladeId)
        {
            var dossierpatient = _context.DossierPatients.Where(u => u.DosPatientId == maladeId).FirstOrDefault();

            if (dossierpatient == null)
            {
                return NotFound();
            }
            return dossierpatient;
        }

        [HttpPost]
        public async Task<ActionResult<DossierPatient>> PostDossierPatient(DossierPatient dossierpatient)
        {
            int count = _context.DossierPatients.Where(o => o.DosPatientId == dossierpatient.DosPatientId).Count();

            if (count == 0)
            {
                _context.DossierPatients.Add(dossierpatient);
                await _context.SaveChangesAsync();
                return CreatedAtAction("PostDossierPatient", new { id = dossierpatient.DosId }, dossierpatient);
            }
            else
            {
                return BadRequest(new
                {
                    StatusCodes = 404,
                    Message = "Ce patient possede deja un dossier"
                });
            }
        }

        private bool DossierPatientExists(int id)
        {
            return _context.DossierPatients.Any(u => u.DosId == id);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutDossierPatient(int id, DossierPatient dossierPatient)
        {
            if (id != dossierPatient.DosId)
            {
                return BadRequest();
            }
            _context.Entry(dossierPatient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DossierPatientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveDossierPatient(int id)
        {
            var dossierpatient = _context.DossierPatients.Where(o => o.DosPatientId == id).FirstOrDefault();

            if (dossierpatient == null)
            {
                return NotFound();
            }
            _context.DossierPatients.Remove(dossierpatient);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        

    }
}
