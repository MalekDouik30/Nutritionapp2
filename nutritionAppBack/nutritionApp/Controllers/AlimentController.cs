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
    public class AlimentController : ControllerBase
    {
        private readonly nutritionAppContext _context;

        public AlimentController(nutritionAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aliment>>> GetAliment()
        {
            return await _context.Aliments.ToListAsync();
        }

        [HttpGet("GetAlimentTest")]
        public async Task<ActionResult<IEnumerable<Aliment>>> GetAlimentTest()
        {
            var resultatEnquete = _context.Aliments.Where(u => u.AlimNomFr == "Salade de thon et légumes, appertisée").FirstOrDefault();

            if (resultatEnquete == null)
            {
                return NotFound();
            }
            return Ok(resultatEnquete);

        }

      

    }
}
