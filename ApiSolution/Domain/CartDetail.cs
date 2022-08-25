using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class CartDetail
    {
        public int ID { get; set; }
        public int CustomerTypeID { get; set; }
        public int TicketTypeID { get; set; }
        public int TicketPriceID { get; set; }
        public int Count { get; set; }
        public int CartID { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime UpdateTime { get; set; }
    }
}
