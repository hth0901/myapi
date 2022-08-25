using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class CustomerType
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Note { get; set; }
        public DateTime CreatedTime { get; set; }
        public int UpdateByID { get; set; }
        public DateTime UpdateTime { get; set; }
        public int CreatedByID { get; set; }
        public string ColorCode { get; set; }
    }
}
