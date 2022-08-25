using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Customer
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public DateTime DateCreate { get; set; }
        public int LastModifiedID { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public string IdCreate { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}
