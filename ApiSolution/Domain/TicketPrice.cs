using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class TicketPrice
    {
        public int ID { get; set; }
        public int CustomerTypeID { get; set; }
        public int TiketTypeID { get; set; }
        public int Price { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public int CreatedByID { get; set; }
        public int UpdateByID { get; set; }
    }
    public class TicketPriceByDate {
        public int PlaceId { get; set; }
        public string OrderId { get; set; }
        public int TotalPrice { get; set; }
    }
}
