using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Service
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string PriceDescription { get; set; }
        public int? VideoID { get; set; }
        public int? ImageID { get; set; }

        public string ImageUrl { get; set; }

        [NotMapped]
        public List<string> ListImage { get; set; }
    }
}
