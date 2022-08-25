using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ResponseEntity
{
    public class TicketListResponse
    {
        public List<TicketItemResponse> ListData
        {
            get; set;
        } = new List<TicketItemResponse>();

        public int TotalRows { get; set; }
    }
    public class TicketItemResponse
    {
        public Guid TicketId { get; set; }
        public string OrderTime { get; set; }
        public int PayStatus { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int TotalRows { get; set; }
        public string OrderId { get; set; }
        public string Places { get; set; }
        public string CreatedBy { get; set; }
    }
  
}
