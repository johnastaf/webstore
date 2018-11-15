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
            //Phone ph1 = new Phone { Name = "test1", Price = 200 };
            //Phone ph2 = new Phone { Name = "test2", Price = 100 };
            //_context.Phones.AddRange(new List<Phone> { ph1, ph2 });
            

            //OrderItem item1 = new OrderItem { Phone = ph1, Price = 200, Quntity = 2 };
            //OrderItem item2 = new OrderItem {  Phone = ph2, Price = 100, Quntity = 3 };
            //_context.OrderItems.AddRange(new List<OrderItem> { item1, item2 });

            //Order order = new Order { Address = "Moscow", Date = DateTime.Now, Name = "John", Total = 700, Items = new List<OrderItem> { item1, item2 } };
            //_context.Orders.Add(order);

            //_context.SaveChanges();

            return _context.Orders.ToList();
        }

        [HttpPost("[action]")]
        public string CreateOrder([FromBody]Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();

            return "Success!!!";
        }
    }
}