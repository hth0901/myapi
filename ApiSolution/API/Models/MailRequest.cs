using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class MailRequest
    {
        public string ToName { get; set; }
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string QrString { get; set; }
        public List<IFormFile> Attchments { get; set; }
    }
}
