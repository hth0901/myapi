using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ResponseEntity
{
    public class UserCartDetailResponse
    {
        public int CartDetailId { get; set; }
        public int CartId { get; set; }
        public int TicketTypeId { get; set; }
        public string ListPlaceID { get; set; }
        public int CustommerTypeId { get; set; }
        public string CustommerTypeName { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
    }
}
