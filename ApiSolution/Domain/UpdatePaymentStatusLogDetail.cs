using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UpdatePaymentStatusLogDetail
    {
        public int Id { get; set; }
        public int MasterId { get; set; }
        public string productId { get; set; }
        public string amount { get; set; }
        public string tipAndFee { get; set; }
        public string ccy { get; set; }
        public string qty { get; set; }
        public string node { get; set; }
    }
}
