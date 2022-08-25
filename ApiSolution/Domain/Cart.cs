using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Cart
    {
        public int ID { get; set; } 
        public int CustomerID { get; set; }
        public int CartDetailID { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime LastModifiedDate { get; set; }
    }
}
