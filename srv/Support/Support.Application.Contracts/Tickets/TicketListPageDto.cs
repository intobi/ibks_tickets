using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Support.Application.Contracts.Tickets
{
    public class TicketListPageDto
    {
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int Offset { get; set; }
        public List<TicketListItemDto> Items { get; set; }
    }
}
