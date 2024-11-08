using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Support.Application.Contracts.TicketReplies
{
    public class TicketReplyDto
    {
        public string Text { get; set; }
        public DateTime ReplyDate { get; set; }
    }
}
