using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebStore.Models;

namespace WebStore
{
    [Produces("application/json")]
    [Route("api/Phones")]
    public class PhonesController : Controller
    {
        private readonly WebStoreContext _context;
        List<Phone> phones = new List<Phone>();

        public PhonesController(WebStoreContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public List<Phone> GetPhones()
        {
            //phones.Add(new Phone { Name = "iPhone 7 Plus", Price = 60000 });
            //phones.Add(new Phone { Name = "Samsung Galaxy A5", Price = 24000 });
            //phones.Add(new Phone { Name = "Xiaomi Mi 8", Price = 13000 });

            //return phones;

            return _context.Phones.ToList();
        }

        [HttpPost("[action]")]
        public string CreatePhone([FromBody]Phone phone)
        {
            _context.Add(phone);
            _context.SaveChanges();

            return "Success!!!";
        }

        [HttpGet("[action]/{id}")]
        public string RemovePhone(string id)
        {
            Phone phone = _context.Phones.FirstOrDefault(p => p.Id == Int32.Parse(id));
            if (phone != null)
            {
                _context.Phones.Remove(phone);
                _context.SaveChanges();

                return "Removed " + id;
            }

            return "Not removed" + id;
        }
    }
}