using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ResponseEntity
{
    public class UserCartResponse
    {
        public int CartId { get; set; }
        public int TicketTypeId { get; set; }
        public string PlaceId { get; set; }
        public string PlaceName { get; set; }
        public int ImageID { get; set; }
        public string ImageUrl { get; set; }
    }
}
