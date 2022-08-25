using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Event
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Introduce { get; set; }

        public DateTime CreatedTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public int CreatedByID { get; set; }
        public int UpdateByID { get; set; }
        public int ImageID { get; set; }
        public double Lattitude { get; set; }
        public double Longtidute { get; set; }
        public string Address { get; set; }
        public DateTime Open_date { get; set; }
        public int TicketTypeID { get; set; }
        public string ImageUrl { get; set; }
        public int VideoID { get; set; }
        public string Note { get; set; }
        public List<string> ListImage { get; set; }
        public string IsDaily { get; set; }
        public string EventTime { get; set; }
        public Boolean Active { get; set; }
    }
}
