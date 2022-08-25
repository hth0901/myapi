using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ResponseEntity
{
    public class CommonResponse
    {
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
    }
}
