using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ResponseEntity
{
    public class ThongTinVeScanResponse
    {
        public string FullName { get; set; }
        public string PlaceName { get; set; }
        public string CustomerTypeName { get; set; }
        public int QuantityRemain { get; set; }
        public int Quantity { get; set; }
    }
}
