﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Support.Application.Contracts.TicketReplies
{
    public interface ITicketReplyService
    {
        Task<List<TicketReplyDto>> GetTicketReplies(long ticketId);
        Task<TicketReplyDto> SendTicketReply(SendTicketReplyRequest request);
    }
}
