using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebStore.Models
{
    public class Register
    {
        public string ExternalId { get; set; } 
        public string Email { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
    }
}
