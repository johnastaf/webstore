using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using WebStore.Models;

namespace WebStore.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        private readonly WebStoreContext _context;

        public UserController(WebStoreContext context)
        {
            _context = context;
        }

        [HttpPost("[action]")]
        public IActionResult Token([FromBody]Login model)
        {
            var identity = GetIdentity(model.email, model.password);
            if (identity == null)
            {
                return BadRequest("Wrong user name or password");
            }

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: "WebStoreIssuer",
                    audience: "WebStoreAudience",
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(5)),
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("WebStoreSecretKey")), SecurityAlgorithms.HmacSha256));

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new { access_token = encodedJwt, username = identity.Name, email = identity.FindFirst("email").Value, role = identity.FindFirst(ClaimsIdentity.DefaultRoleClaimType).Value };

            return Ok(response);
        }

        [HttpPost("[action]")]
        public IActionResult Register([FromBody]Register model)
        {
            if (!String.IsNullOrWhiteSpace(model.ExternalId))
            {
                User person = _context.Users.FirstOrDefault(x => x.ExternalId == model.ExternalId);

                if (person != null)
                {
                    return Token(new Login { email = person.Email, password = "" });
                }
                else
                {
                    return CreataUserAndReturnToken(model);
                }
            }
            else
            {
                User person = _context.Users.FirstOrDefault(x => x.Email == model.Email);

                if (person != null)
                {
                    return BadRequest("User already exist.");
                }
                else
                {
                    return CreataUserAndReturnToken(model);
                }
            }
        }

        [HttpPost("[action]")]
        public IActionResult ValidateToken([FromBody]TokenModel token)
        {
            try
            {
                var jwtToken = new JwtSecurityToken(token.Token);

                var response = new
                {
                    username = jwtToken.Claims.FirstOrDefault(t => t.Type == ClaimsIdentity.DefaultNameClaimType).Value,
                    email = jwtToken.Claims.FirstOrDefault(t => t.Type == "email").Value
                };

                return Ok(response);
            }
            catch(Exception ex)
            {
                return BadRequest("Token is not valid.");
            }
        }

        private ClaimsIdentity GetIdentity(string email, string password)
        {
            User person = _context.Users.FirstOrDefault(x => x.Email == email && x.Password == password);

            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Name),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role),
                    new Claim("email", person.Email)
                };

                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

                return claimsIdentity;
            }

            return null;
        }


        private IActionResult CreataUserAndReturnToken(Register model)
        {
            User user = new User
            {
                Name = model.Name,
                Email = model.Email,
                Password = model.Password,
                Role = "user",
                ExternalId = model.ExternalId
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Token(new Login { email = user.Email, password = user.Password });
        }
    }
}