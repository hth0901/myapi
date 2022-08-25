using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class DownloadTicketRequest
    {
        public string orderId { get; set; }
        public string placesName { get; set; }
        public int adultQuantity { get; set; }
        public int childrenQuantity { get; set; }
        public string totalQuantity { get; set; }
        public string customerTypeName { get; set; }
        public int customerTypeId { get; set; }
        public string email { get; set; }
        public string fullName { get; set; }
        public string phoneNumber { get; set; }
        public int totalPrice { get; set; }
        public string uniqId { get; set; }
        public string qrString { get; set; }
        public string toEmail { get; set; }
        public string mailSubject { get; set; }
        public string mailBody { get; set; }
    }
}
