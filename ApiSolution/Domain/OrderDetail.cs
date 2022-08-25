using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public string OrderId { get; set; }
        public int TicketTypeId { get; set; }
        public int Quantity { get; set; }
        public int CustomerType { get; set; }
        public int UnitPrice { get; set; }
        public string IsUsed { get; set; }
    }
}
