using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ResponseEntity
{
    public class TicketDetailAfterScan
    {
        public string PlaceName { get; set; }
        public string Places { get; set; }
        public string CustomerTypeName { get; set; }
        public string ColorCode { get; set; }
        public string OrderId { get; set; }
        public int Quantity { get; set; }
        public int QuantityRemain { get; set; }
    }
}
