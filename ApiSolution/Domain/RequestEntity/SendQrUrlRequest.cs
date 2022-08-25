using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class SendQrUrlRequest
    {
        public string id { get; set; }
        public string email { get; set; }
    }
}
