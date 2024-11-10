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
        public string Priority { get; set; }
        public string Status { get; set; }
        public string Title { get; set; }
        public string ApplicationName { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
    }
}
