using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class QrCodeItemPayment
    {
        public string productId { get; set; }
        public string amount { get; set; }
        public string tipAndFee { get; set; }
        public string ccy { get; set; }
        public string qty { get; set; }
        public string note { get; set; }
    }
}
