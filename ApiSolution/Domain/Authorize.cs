using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Authorize
    {
        public int ID { get; set; }
        public int MenuId { get; set; }
        public int RoleId { get; set; }
        public string Username { get; set; }
        public string IsAuthorize { get; set; }
    }
}
