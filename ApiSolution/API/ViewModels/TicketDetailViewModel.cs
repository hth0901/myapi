using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModels
{
    public class TicketDetailViewModel : Domain.ResponseEntity.TicketDetailAfterScan
    {
        public string orderid { get; set; }
        public int customertypeid { get; set; }
    }
}
