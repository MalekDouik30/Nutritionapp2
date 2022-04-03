using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using nutritionApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
// JWT
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
// Hasing Password with BCrypt 
using BCrypt.Net;
using System.Globalization;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace nutritionApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilisateurController : ControllerBase
    {
        private readonly nutritionAppContext _context;

        public UtilisateurController(nutritionAppContext context)
        {
            _context = context;
        }


        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] Utilisateur utilisateur)
        {
            if (utilisateur == null)
            {
                return BadRequest("Invalid client Request");
            }
            else
            {
                if (utilisateur.UtiLogin != null)
                {
                    var user = _context.Utilisateurs.Where(u => u.UtiLogin == utilisateur.UtiLogin).FirstOrDefault();
                    //Authentication with login 
                    if (user != null)
                    {
                        // verify password
                        if (VerifyPassword(utilisateur.UtiMotPasse, user.UtiMotPasse))
                        {
                            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                            var claims = new List<Claim>{
                            new Claim(ClaimTypes.NameIdentifier, user.UtiId.ToString()),
                            new Claim(ClaimTypes.Name, user.UtiNom),
                            new Claim(ClaimTypes.Email, user.UtiEmail),
                            new Claim(ClaimTypes.Surname, user.UtiLogin),
                            new Claim(ClaimTypes.AuthorizationDecision, user.UtiEtat.ToString()),
                            new Claim(ClaimTypes.Role, user.UtiRole.ToString()), // We use to string to convert the role from long to string because ClaimTypes.Role is of type string
                            };
                            var tokenOptions = new JwtSecurityToken(
                                issuer: "https://localhost:44343",
                                audience: "https://localhost:44343",
                                claims: claims,
                                expires: DateTime.Now.AddMinutes(30),
                                signingCredentials: signinCredentials
                                );
                            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                            return Ok(new { Token = tokenString });
                        }
                        else
                        {
                            return NotFound(new { StatusCodes = 404, Message = "Le mot de passe est incorrect avec une authentification avec le login" });
                        }
                    }
                    else
                    {
                        return NotFound(new { StatusCodes = 404, Message = "L'utilisateur avec ce login n'existe pas" });
                    }
                }
                else
                {
                    return NotFound(new
                    {
                        StatusCodes = 404,
                        Message = "L'utilisateur donnée n'est pas null mais le mail et le mot de passe données n'existe pas"
                    });
                }
            }
        }

        // GET: api/Utilisateurs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Utilisateur>>> GetUtilisateur()
        {
            return await _context.Utilisateurs.ToListAsync();
        }

        // GET: api/utilisateur/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Utilisateur>> GetUtilisateur(long id)
        {
            var utilisateur = await _context.Utilisateurs.FindAsync(id);
            if (utilisateur == null)
            {
                return NotFound();
            }
            return utilisateur;
        }

        [HttpPost]
        public async Task<ActionResult<Utilisateur>> PostUtilisateur(Utilisateur utilisateur)
        {
            //haspassword
            utilisateur.UtiMotPasse = HasingPassword(utilisateur.UtiMotPasse);
            // verif if login exist in database
            var loginExist = _context.Utilisateurs.FirstOrDefault(acc => acc.UtiLogin == utilisateur.UtiLogin);
            if (loginExist != null)
            {
                return BadRequest(new
                {
                    StatusCodes = 404,
                    Message = "Le login existe dans la base de données"
                });
            }
            // Add users
            _context.Utilisateurs.Add(utilisateur);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUtilisateur", new { id = utilisateur.UtiId }, utilisateur);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUtilisateur(int id, Utilisateur utilisateur)
        {
            if (id != utilisateur.UtiId)
            {
                return BadRequest();
            }
            _context.Entry(utilisateur).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UtilisateurExists(id))
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

        private bool UtilisateurExists(int id)
        {
            return _context.Utilisateurs.Any(u => u.UtiId == id);
        }

        private bool UtilisateurExists2(long id)
        {
            return _context.Utilisateurs.Any(u => u.UtiId == id);
        }

        [HttpPut("delete/{id}")]
        public async Task<IActionResult> DeleteUtilisateur(long id)
        {
            var utilisateur = _context.Utilisateurs.Find(id);

            if (utilisateur == null)
            {
                return NotFound();
            }

            if (utilisateur != null)
            {
                if (utilisateur.UtiEtat == true)
                {
                    utilisateur.UtiEtat = false;
                }
                _context.Entry(utilisateur).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UtilisateurExists2(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return NoContent();
        }

        // This function is used to block the user after n authentication attempts
        [HttpPut("BlockAuthentification/{login}")]
        public async Task<ActionResult<Utilisateur>> DeleteUtilisateurByLogin(String login)
        {
            var utilisateur = _context.Utilisateurs.FirstOrDefault(acc => acc.UtiLogin == login);

            if (utilisateur == null)
            {
                // Authentication was done with the email
                var utilisateur2 = _context.Utilisateurs.FirstOrDefault(acc => acc.UtiEmail == login);
                utilisateur = utilisateur2;
            }

            if (utilisateur != null)
            {
                if (utilisateur.UtiEtat == true)
                {
                    utilisateur.UtiEtat = false;
                }
                _context.Entry(utilisateur).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (utilisateur == null)
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            if (utilisateur == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        private string HasingPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool VerifyPassword(string newPassword, string hashedPassword)
        {
            try
            {
                return BCrypt.Net.BCrypt.Verify(newPassword, hashedPassword);
            }
            catch (Exception)
            {
                return false;
            }
        }

        [HttpPut("initialize/{id}")]
        public async Task<IActionResult> initializeUser(long id)
        {
            var utilisateur = _context.Utilisateurs.Find(id);
            // To get default password from parameter table
            var parameter = _context.Parametres.FirstOrDefault();

            if (utilisateur == null){ return NotFound(); }

            utilisateur.UtiEtat = true;
            utilisateur.UtiMotPasse = HasingPassword(parameter.ParMotPasseParDefaut);
            _context.Entry(utilisateur).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UtilisateurExists2(id))
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

        [HttpPut("resetPassword/{login}/{newPassword}")]
        public async Task<IActionResult> resetPassword(string login, string newPassword)
        {

            var utilisateur = _context.Utilisateurs.Where(u => u.UtiLogin == login).FirstOrDefault();

            if (utilisateur == null)
            {
                return NotFound();
            }

            if (newPassword == null)
            {
                return BadRequest();
            }

            utilisateur.UtiEtat = true;
            utilisateur.UtiMotPasse = HasingPassword(newPassword);

            _context.Entry(utilisateur).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NoContent();
        }



    }

}
