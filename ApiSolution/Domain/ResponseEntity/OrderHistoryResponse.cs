using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ResponseEntity
{
    public class OrderHistoryResponse
    {
        public string OrderId { get; set; }
        public int TicketTypeId { get; set; }
        public int Quantity { get; set; }
        public int CustomerType { get; set; }
        public int UnitPrice { get; set; }
        public string Name { get; set; }
        public string CustomerTypeName { get; set; }
    }
}
