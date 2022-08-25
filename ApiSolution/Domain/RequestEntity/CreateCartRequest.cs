using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class CreateCartRequest
    {
        public int TicketTypeId { get; set; }

        public List<CreateCartDetailRequest> PriceDetail { get; set; }
    }

    public class CreateCartDetailRequest
    {
        public int TicketTypeId { get; set; }
        public int CustommerTypeId { get; set; }
        public int Quantity { get; set; }
    }
}
