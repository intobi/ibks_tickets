using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Support.Application.Contracts.Tickets
{
    public class TicketUpdateRequest
    {
        public int TicketId { get; set; }
        public int PriorityId { get; set; }
        public int StatusId { get; set; }
        public int ApplicationId { get; set; }
        public string? ApplicationName { get; set; }
        public int TypeId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
