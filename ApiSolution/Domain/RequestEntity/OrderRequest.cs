using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class OrderRequest
    {
        //public OrderTemp Order { get; set; }
        public OrderRequestInfo Order { get; set; }
        public List<TicketDetail> TicketDetails { get; set; }
        public List<OrderDetail> OrderDetails { get; set; }
        public List<int> Cart { get; set; }
    }
}
