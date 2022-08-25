using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RequestEntity
{
    public class SendEmailTicketRequest
    {
        public List<string> ticketcontent { get; set; }
        public string email { get; set; }
    }
}
