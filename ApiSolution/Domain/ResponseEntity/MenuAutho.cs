using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ResponseEntity
{
    public class MenuAutho
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string Name { get; set; }
        public string IsAutho { get; set; }
        public int MenuId { get; set; }
    }
}
