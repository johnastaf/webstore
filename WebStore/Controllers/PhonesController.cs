using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebStore
{
    [Produces("application/json")]
    [Route("api/Phones")]
    public class PhonesController : Controller
    {
        [HttpGet("[action]")]
        public List<Phone> GetPhones()
        {
            List<Phone> phones = new List<Phone>();
            phones.Add(new Phone { Name = "iPhone 7 Plus", Price = 60000 });
            phones.Add(new Phone { Name = "Samsung Galaxy A5", Price = 24000 });
            phones.Add(new Phone { Name = "Xiaomi Mi 8", Price = 13000 });

            return phones;
        }
    }
}