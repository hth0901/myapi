using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class PlacePrice
    {
        public int TicketTypeId { get; set; }
        public string ID { get; set; }
        //public string ListPlaceID { get; set; }
        public string Title { get; set; }
        public int ImageID { get; set; }
        public string ImageUrl { get; set; }
        public int AdultPrice { get; set; }
        public int ChildrenPrice { get; set; }
    }
}
