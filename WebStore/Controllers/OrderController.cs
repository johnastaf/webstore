using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebStore.Models;
using Microsoft.EntityFrameworkCore;

namespace WebStore
{
    [Produces("application/json")]
    [Route("api/Order")]
    public class OrderController : Controller
    {
        private readonly WebStoreContext _context;

        public OrderController(WebStoreContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public List<Order> GetOrders()
        {
            var orders = _context.Orders.Include(order => order.Items).ThenInclude(item => item.Phone).ToList();

            return orders;
        }

        [HttpPost("[action]")]
        public string CreateOrder([FromBody]Order order)
        {
            foreach (OrderItem itemOrder in order.Items)
            {
                itemOrder.Phone = _context.Phones.FirstOrDefault(p => p.Id == itemOrder.Phone.Id);
            }

            _context.Orders.Add(order);
            _context.SaveChanges();

            return "Success!!!";
        }
    }
}