using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class FeedbackReplyTemplate
    {
        public int ID { get; set; }
        public string Content { get; set; }
        public string IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string CreatedBy { get; set; } = "";
        public string UpdatedBy { get; set; } = "";
    }
}
