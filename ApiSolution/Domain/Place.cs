using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Place
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string TitleEn { get; set; }
        public string Content { get; set; }
        public string ContentEn { get; set; }
        public string Introduce { get; set; }
        public string Address { get; set; }
        public double Lattitude { get; set; }
        public double Longtidute { get; set; }
        public int ImageID { get; set; }
        public int VideoID { get; set; }
        public DateTime CreatedTime { get; set; }
        public int CreatedByID { get; set; }
        public DateTime UpdateTime { get; set; }
        public int UpdateByID { get; set; }
        public string ImageUrl { get; set; }
        public string SlideShow { get; set; }
        public string Description { get; set; }
        public Boolean Active { get; set; }
    }

    public class PlaceDetailModel : Place
    {
        public int AdultPrice { get; set; }
        public int ChildrenPrice { get; set; }
    }
}
