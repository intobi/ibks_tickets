using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Support.Application.Contracts.Tickets
{
    public class TicketListPageDto
    {
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int Page { get; set; }
        public List<TicketListItemDto> Items { get; set; }
    }
}
