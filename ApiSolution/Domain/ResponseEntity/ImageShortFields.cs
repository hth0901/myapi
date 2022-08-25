using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ResponseEntity
{
    public class ImageShortFields
    {
        public int ID { get; set; }
        public string Url { get; set; }
        public int? PlaceID { get; set; }
        public int? EventID { get; set; }
        public int? DaiNoiID { get; set; }
    }
}
