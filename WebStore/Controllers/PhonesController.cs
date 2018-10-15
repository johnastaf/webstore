using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebStore.Controllers
{
    [Produces("application/json")]
    [Route("api/Phones")]
    public class PhonesController : Controller
    {
        private static string[] Phones = new[]
        {
            "iPhone 7 Plus", "Samsung Galaxy A5", "Xiaomi Mi 8"
        };

        [HttpGet("[action]")]
        public string[] GetPhones()
        {
            return Phones;
        }
    }
}