using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{    public class TicketOrder
    {
        public Guid ID { get; set; }
        public decimal TotalPrice { get; set; }
        public string OrderTempId { get; set; }
        public int PayStatus { get; set; }
        public string IsDelete { get; set; }
        public string IsUsed { get; set; }

        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
    }
}
