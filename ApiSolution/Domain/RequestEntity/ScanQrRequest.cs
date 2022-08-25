using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class ScanQrRequest
    {
        public string qrString { get; set; }
        public int placeId { get; set; }
    }

    public class CheckInTicketRequest
    {
        public string OrderId { get; set; }
        public int PlaceId { get; set; }
        public Guid TicketId { get; set; }
        public int Quantity { get; set; }
        public int CustomerType { get; set; }
    }
}
