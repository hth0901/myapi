using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class UpdateTicketDetailRequest
    {
        public int key { get; set; }
        public string values { get; set; }
    }
}
