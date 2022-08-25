using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class CreateEmailConfigRequest
    {
        public string DisplayName { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
    }
}
