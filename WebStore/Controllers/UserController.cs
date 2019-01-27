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
        public class LoginPassword

        {
            public string email { get; set; }
            public string password { get; set; }
        }

        private List<User> people = new List<User>
        {
            new User {Email="111", Name="John", Password="111", Role = "admin" },
            new User { Email="222", Name="Nikki", Password="222", Role = "user" }
        };


        [HttpPost("[action]")]
        public IActionResult Token([FromBody]LoginPassword model)
        {
            var identity = GetIdentity(model.email, model.password);
            if (identity == null)
            {
                return BadRequest();
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

            var response = new { access_token = encodedJwt, username = identity.Name };


            return Ok(JsonConvert.SerializeObject(response));
        }

        private ClaimsIdentity GetIdentity(string email, string password)
        {
            User person = people.FirstOrDefault(x => x.Email == email && x.Password == password);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Name),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            return null;
        }
    }
}