using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class TicketPriceType
    {
        public int ID { get; set; }
        public TicketType Type { get; set; }
        public List<TicketPrice> Price { get; set; }
    }
}
