﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class SendFeedBackRequest
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
    }
}
