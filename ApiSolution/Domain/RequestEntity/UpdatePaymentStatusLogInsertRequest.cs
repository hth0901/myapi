using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class UpdatePaymentStatusLogInsertRequest
    {
		public int Id { get; set; }
		public string code { get; set; }
		public string message { get; set; }
		public string msgType { get; set; }
		public string txnId { get; set; }
		public string qrTrace { get; set; }
		public string bankCode { get; set; }
		public string mobile { get; set; }
		public string accountNo { get; set; }
		public string amount { get; set; }
		public string payDate { get; set; }
		public string checksum { get; set; }
	}
}
