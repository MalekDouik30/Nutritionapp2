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
    public class RemarqueController : ControllerBase
    {
        private readonly nutritionAppContext _context;
        public RemarqueController(nutritionAppContext context)
        {
            _context=context;
        }

        [HttpGet("{id}")]
        public List<Remarque> GetRemarqueByPatientId(int id)
        {
            var remarque = _context.Remarques.Where(u => u.RemIdPateint == id).ToList<Remarque>();

            if (remarque == null)
            {
                return null;
            }
            return remarque;
        }

        [HttpPost]
        public async Task<ActionResult<Remarque>> PostRemarque(Remarque remarque)
        {
            _context.Remarques.Add(remarque);
            await _context.SaveChangesAsync();
            return CreatedAtAction("PostRemarque", new { id = remarque.RemId }, remarque);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveRemarque(long id)
        {
            var remarque = await _context.Remarques.FindAsync(id);
            if (remarque == null)
            {
                return NotFound();
            }
            _context.Remarques.Remove(remarque);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
