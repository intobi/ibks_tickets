using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Support.Application.Contracts.Tickets
{
    public class TicketCreateRequest
    {
        public string Title { get; set; }
        public string Descrption { get; set; }
        public int TypeId { get; set; }
        public int PriorityId { get; set; }
        public int ApplicationId { get; set; }
    }
}
