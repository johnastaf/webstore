﻿using System;
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

            var response = new { access_token = encodedJwt, username = identity.Name, email = identity.FindFirst("email").Value };


            return Ok(JsonConvert.SerializeObject(response));
        }

        [HttpPost("[action]")]
        public IActionResult Register([FromBody]Register model)
        {
            User person = _context.Users.FirstOrDefault(x => x.Email == model.Email);

            if (person != null)
            {
                return BadRequest("Already exist");
            }
            else
            {
                User user = new User
                {
                    Name = model.Name,
                    Email = model.Email,
                    Password = model.Password,
                    Role = "user"
                };

                _context.Users.Add(user);
                _context.SaveChanges();

                return this.Token(new Login { email = user.Email, password = user.Password });
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
    }
}