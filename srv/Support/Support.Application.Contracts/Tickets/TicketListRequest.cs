using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Support.Application.Contracts.Tickets
{
    public class TicketListRequest
    {
        public int PageSize { get; set; }
        public int Offset { get; set; }
        public string TitleFilter { get; set; }
    }
}
