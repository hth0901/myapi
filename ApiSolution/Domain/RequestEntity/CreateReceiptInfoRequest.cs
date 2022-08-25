using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class CreateReceiptInfoRequest
    {
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string TaxNumber { get; set; }
        public string Address { get; set; }
        public string CusCode { get; set; } = "";
        public string CusType { get; set; } = "0";
    }
}
