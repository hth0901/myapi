using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class UpdateAccountRequest
    {
        public string FullName { get; set; }
        public string id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public int roleid { get; set; }
    }
}
