using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class CreateQrPayRequest
    {
        public string appId { get; set; }
        public string merchantName { get; set; }
        public string serviceCode { get; set; }
        public string countryCode { get; set; }
        public string merchantCode { get; set; }
        public string terminalId { get; set; }
        public string payType { get; set; }
        public string productId { get; set; }
        public string txnId { get; set; }
        public string billNumber { get; set; }
        public string amount { get; set; }
        public string ccy { get; set; }
        public string expDate { get; set; }
        public string desc { get; set; }
        public string masterMerCode { get; set; }
        public string merchantType { get; set; }
        public string tipAndFee { get; set; }
        public string consumerID { get; set; }
        public string purpose { get; set; }
        public string checksum { get; set; }
        public string payloadFormat { get; set; }
        public string productName { get; set; }
        public string imageName { get; set; }
        public string merchantCity { get; set; }
        public string fixedFee { get; set; }
        public string merchantCC { get; set; }
        public string percentageFee { get; set; }
        public string pinCode { get; set; }
        public string mobile { get; set; }
        public string creator { get; set; }
    }
}
