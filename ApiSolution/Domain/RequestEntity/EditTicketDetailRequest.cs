using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class EditTicketDetailRequest
    {
        public List<OrderDetail> TicketDetails { get; set; }
    }
}
