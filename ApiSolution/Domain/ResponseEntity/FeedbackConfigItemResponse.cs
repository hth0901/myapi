using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ResponseEntity
{
    public class FeedbackConfigItemResponse : FeedbackReplyTemplate
    {
        public int TotalRows { get; set; }
    }
}
