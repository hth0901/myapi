using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Employee
    {
        public int ID { get; set; }
        public string FullName { get; set; }
        public string Description { get; set; }
        public int RoleID { get; set; }
        public int UpdateByID { get; set; }
        public int CreatedByID { get; set; }
        public DateTime UpdateTime { get; set; }
        public DateTime CreatedTime { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }

    }

    public class RegisterRequest
    {
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
