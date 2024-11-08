using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Support.Application.Contracts.Tickets
{
    public class TicketListItemDto
    {
        public long Id { get; set; }
        public int PriorityId { get; set; }
        public int StatusId { get; set; }
        public string Title { get; set; }
        public string ApplicationName { get; set; }
        public int TypeId { get; set; }
        public DateTime Date { get; set; }
    }
}
