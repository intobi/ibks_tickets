using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Support.Application.Contracts.TicketReplies
{
    public class SendTicketReplyRequest
    {
        public long TicketId { get; set; }
        public string ReplyText { get; set; }
    }
}
