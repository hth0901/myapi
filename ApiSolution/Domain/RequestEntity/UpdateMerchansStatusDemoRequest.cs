using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class UpdateMerchansStatusDemoRequest
    {
        public string txnId { get; set; }
        public string code { get; set; }
        public string message { get; set; }
    }
}
