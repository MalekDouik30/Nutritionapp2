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
    public class ContrainteNutritionnelleController : Controller
    {
        private readonly nutritionAppContext _context;

        public ContrainteNutritionnelleController(nutritionAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContrainteAlimentaire>>> GetContrainteAlimentaire()
        {
            return await _context.ContrainteAlimentaires.ToListAsync();
        }

        [HttpGet("{nutriment}")]

        public async Task<IActionResult> GetContrainteAlimentaireByNutriment(string nutriment)
        {
            var contrainteAlimentaire = _context.ContrainteAlimentaires.Where(n=> n.Con_nutriment == nutriment).FirstOrDefault();

            if (contrainteAlimentaire == null)
            {
                return NotFound();
            }
            return Ok(contrainteAlimentaire);
        }
    }
}
