using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class UpdateMerchantStatusRequest
    {
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
        public string masterMerCode { get; set; }
        public string merchantCode { get; set; }
        public string terminalId { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
        public string province_id { get; set; }
        public string district_id { get; set; }
        public string address { get; set; }
        public string email { get; set; }
        public List<QrCodeItemPayment> addData { get; set; } = new List<QrCodeItemPayment>();
        public string checksum { get; set; }
    }
}
