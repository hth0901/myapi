using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class PromotionUpdateRequest
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Rate { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime? ExtendDate { get; set; }
    }
}
