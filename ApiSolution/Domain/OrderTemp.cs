using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class OrderTemp
    {
        public string ID { get; set; }
        public decimal TotalPrice { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string UniqId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public OrderStatus PayStatus { get; set; }
        public Guid TicketId { get; set; }
        public List<TicketPlaceDetail> TicketPlaceDetails { get; set; }
        public List<Domain.ResponseEntity.TicketDetailReturn> TicketDetailReturn { get; set; }
    }
}
