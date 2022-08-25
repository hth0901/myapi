using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ResponseEntity
{
    public class DiaDiemGiaVeChiTiet
    {
        public int TicketTypeId { get; set; }
        public string ListPlaceID { get; set; }
        public int CustommerTypeId { get; set; }
        public string CustommerTypeName { get; set; }
        public int Price { get; set; }
    }
}
