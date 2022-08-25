using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
   public class Image
    {
        public int ID { get; set; }
        public string Url { get; set; }
        public int PlaceID { get; set; }
        public int EventID { get; set; }
        public int DaiNoiID { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public int CreatedByID { get; set; }
        public int UpdateByID { get; set; }
        public string IsAvatar { get; set; }
        public int ServiceID { get; set; }
    }
}
