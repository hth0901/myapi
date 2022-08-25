using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Menu
    {
        public int ID { get; set; }
        public int ParentID { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string IsActive { get; set; }
        public string Path { get; set; }
        public int DisplayOrder { get; set; }
        public string IsLeaf { get; set; }
        public string IsAdminTool { get; set; }
    }
}
