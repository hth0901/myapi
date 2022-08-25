using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ResponseEntity
{
    public class PromotionConfigListResponse
    {
        public List<PromotionConfigItemResponse> ListData
        {
            get; set;
        } = new List<PromotionConfigItemResponse>();

        public int TotalRows { get; set; } = 0;
    }
}
