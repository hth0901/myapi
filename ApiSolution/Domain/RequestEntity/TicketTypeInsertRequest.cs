using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class TicketTypeInsertRequest
    {
        //public int Id { get; set; } = 0;
        public string Name { get; set;}
        public string Content { get; set; }
        public bool Active { get; set; }
        public string ListPlaceId { get; set; }
        public int TypeValue { get; set; }
        public int DateToExpired { get; set; }
    }

    public class TicketTypeUpdateRequest
    {
        public int Id { get; set; } = 0;
        public string Name { get; set; }
        public string Content { get; set; }
        public int DateToExpired { get; set; }
    }
}
