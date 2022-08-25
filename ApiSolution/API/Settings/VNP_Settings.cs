using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Settings
{
    public class VNP_Settings
    {
        public string vnp_Url { get; set; }
        public string querydr { get; set; }
        public string vnp_TmnCode { get; set; }
        public string vnp_HashSecret { get; set; }
        public string vnp_Returnurl { get; set; }
    }
}
