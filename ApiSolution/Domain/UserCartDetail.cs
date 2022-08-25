using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UserCartDetail
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public int TicketTypeId { get; set; }
        public int CustommerTypeId { get; set; }
        public int Quantity { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
