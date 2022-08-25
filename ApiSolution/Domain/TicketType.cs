using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class TicketType
    {
        public int ID { get; set; }
        public string  Name { get; set; }
        public string Content { get; set; }
        public int UpdateByID { get; set; }
        public int CreatedByID { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public bool Is_VeTuyen { get; set; }
        public bool Active { get; set; }
        public string ListPlaceId { get; set; }
        public string ListEventID { get; set; }
        public int TypeValue { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public int DateToExpired { get; set; }
        public int NumberOfDayCanUse { get; set; }
        public string ImageUrl { get; set; }
    }
}
