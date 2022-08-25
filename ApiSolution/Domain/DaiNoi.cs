using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class DaiNoi
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string TitleEn { get; set; }
        public string SubTitle { get; set; }
        public string SubTitleEn { get; set; }
        public string ContentEn { get; set; }
        public string Introduce { get; set; }

        public int ImageID { get; set; }
        public int VideoID { get; set; }
        public DateTime CreatedTime { get; set; }
        public int CreatedByID { get; set; }
        public DateTime UpdateTime { get; set; }
        public int UpdateByID { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int DisplayOrder { get; set; }
        public string ImageUrl { get; set; }

        public string VideoUrl { get; set; }
        public int Type { get; set; }
        public List<string> ListImage { get; set; }
        public Boolean Active { get; set; }
    }
}
