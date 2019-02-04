using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpPost("[action]")]
        public HttpResponseMessage CreatePhone([FromBody]Phone phone)
        {
            try
            {
                _context.Add(phone);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [Authorize]
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
                catch (Exception ex)
                {
                    return new HttpResponseMessage(HttpStatusCode.NotFound);
                }
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [Authorize]
        [HttpPost("[action]")]
        public HttpResponseMessage UpdatePhone([FromBody]Phone phone)
        {
            Phone ph = _context.Phones.FirstOrDefault(p => p.Id == phone.Id);

            if (ph != null)
            {
                ph.Name = phone.Name;
                ph.Price = phone.Price;
                _context.SaveChanges();

                return new HttpResponseMessage(HttpStatusCode.OK);
            }

            return new HttpResponseMessage(HttpStatusCode.NotFound);
        }

        [Authorize]
        [HttpGet("[action]/{id}")]
        public HttpResponseMessage ShowPhone(string id)
        {
            Phone phone = _context.Phones.FirstOrDefault(p => p.Id == Int32.Parse(id));

            if (phone != null)
            {
                phone.Show = !phone.Show;
                _context.SaveChanges();

                return new HttpResponseMessage(HttpStatusCode.OK);
            }

            return new HttpResponseMessage(HttpStatusCode.NotFound);
        }
    }
}