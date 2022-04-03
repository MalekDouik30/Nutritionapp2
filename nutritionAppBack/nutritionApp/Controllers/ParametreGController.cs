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
    public class ParametreGController : ControllerBase
    {
        private readonly nutritionAppContext _context;

        public ParametreGController(nutritionAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Parametre>>> GetParametre()
        {
            return await _context.Parametres.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Parametre>> PostParametre(Parametre parametre)
        {
            if (_context.Parametres.Count() >=1)
            {
                return BadRequest(new
                {
                    StatusCodes = 404,
                    Message = "La liste des parametres globaux ne pas pas contenire plus qu'un seul parametre"
                });
            }
            _context.Parametres.Add(parametre);
            await _context.SaveChangesAsync();
            return CreatedAtAction("PostParametre", new { id = parametre.ParId }, parametre);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveParametre(long id)
        {
            var parametre = await _context.Parametres.FindAsync(id);
            if (parametre == null)
            {
                return NotFound();
            }
            _context.Parametres.Remove(parametre);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ParametreExists(int id)
        {
            return _context.Parametres.Any(u => u.ParId == id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutParametre(int id, Parametre param)
        {
            if (id != param.ParId)
            {
                return BadRequest();
            }
            _context.Entry(param).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParametreExists(id))
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

    }
}


