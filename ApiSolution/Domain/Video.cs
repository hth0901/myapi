using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Video
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int PlaceID { get; set; }
        public int EventID { get; set; }
        public int DaiNoiID { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public int CreatedByID { get; set; }
        public int UpdateByID { get; set; }
    }
}
