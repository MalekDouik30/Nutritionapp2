using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using nutritionApp.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;


namespace nutritionApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RendezvousController : ControllerBase
    {
        private readonly nutritionAppContext _context;
        private IHostingEnvironment _hostingEnvironnment;

        public RendezvousController(nutritionAppContext context,IHostingEnvironment hostingEnvironnment)
        {
            _context = context;
            _hostingEnvironnment = hostingEnvironnment;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rendezvou>>> GetRendezvous()
        {
            return await _context.Rendezvous.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Rendezvou>> GetRendezVousById(int id)
        {

            var rendezvous = await _context.Rendezvous.FindAsync(id);
            if (rendezvous == null)
            {
                return NotFound();
            }

            return rendezvous;
        }

        [HttpPost]
        public async Task<ActionResult<Rendezvou>> PostRendezvous(Rendezvou rendezvou)
        {

            _context.Rendezvous.Add(rendezvou);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostRendezvous", new { id = rendezvou.RendId }, rendezvou);
        }

        private bool RendezvousExists(int id)
        {
            return _context.Rendezvous.Any(u => u.RendId == id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRendezvous(int id, Rendezvou rendezvous)
        {
            if (id != rendezvous.RendId)
            {
                return BadRequest();
            }
            _context.Entry(rendezvous).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RendezvousExists(id))
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
        public async Task<IActionResult> RemoveRendezvous(long id)
        {
            var rendezvous = await _context.Rendezvous.FindAsync(id);
            if (rendezvous == null)
            {
                return NotFound();
            }
            _context.Rendezvous.Remove(rendezvous);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("GetRendezVousByMedecin/{idMedecin}")]
        public IQueryable <Rendezvou> GetRendezVousByMedecin(int idMedecin)
        {
            var listRdz = _context.Rendezvous.Where(u => u.RendMedecinId == idMedecin);
            return listRdz;
        }

        [HttpGet("searchs")]
        public ActionResult<Rendezvou> GetRdzSearch(DateTime dated, DateTime datef)
        {
            string condition = null;
            if (dated != null)
            {
                if (condition == null)
                {
                    condition = condition + " rend_date between '" + dated + "' AND '" + datef + "' ";
                }
            }

            if (condition != null)
            {
                try
                {
                    //return Ok("SELECT * from  dbo.rendezvous WHERE " + condition);

                    var result = _context.Rendezvous.FromSqlRaw("SELECT * from dbo.rendezvous WHERE "
                       + condition).ToList();
                    return Ok(result);
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return NotFound();
        }
    

            [HttpPost("UploadFile"), DisableRequestSizeLimit]
        public ActionResult UploadFile()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);

                    }
                    return Ok(new {dbPath});
                }
                else
                {
                    return BadRequest();
                }
            }

            catch (System.Exception ex)
            {
                return StatusCode(500,$"Erreur serveur interne:" + ex.Message);
            }

        }

    }
}
