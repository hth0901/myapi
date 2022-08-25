using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class FeedBack
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public string IsReply { get; set; }

    }
}
