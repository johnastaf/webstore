﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebStore.Models
{
    public class Login
    {
        public string email { get; set; }
        public string password { get; set; }
    }

    public class TokenModel
    {
        public string Token { get; set; }
    }
}
