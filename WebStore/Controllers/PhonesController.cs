using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
        public HttpResponseMessage RemovePhone(string id)
        {
            Phone phone = _context.Phones.FirstOrDefault(p => p.Id == Int32.Parse(id));
            if (phone != null)
            {
                try
                {
                    _context.Phones.Remove(phone);
                    _context.SaveChanges();
                }
                catch (System.Exception ex)
                {
                    return new HttpResponseMessage(HttpStatusCode.NotFound);
                }
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }


        [HttpPost("[action]")]
        public string UpdatePhone([FromBody]Phone phone)
        {
            Phone ph = _context.Phones.FirstOrDefault(p => p.Id == phone.Id);
            if (ph != null)
            {
                ph.Name = phone.Name;
                ph.Price = phone.Price;
                _context.SaveChanges();

                return "Updated";
            }

            return "Not update";
        }

        [HttpGet("[action]/{id}")]
        public HttpResponseMessage ShowPhone(string id)
        {
            Phone phone = _context.Phones.FirstOrDefault(p => p.Id == Int32.Parse(id));
            if (phone != null)
            {
                phone.Show = !phone.Show;
                _context.SaveChanges();

                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}