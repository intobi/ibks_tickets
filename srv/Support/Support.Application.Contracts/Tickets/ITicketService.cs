﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Support.Application.Contracts.Tickets
{
    public interface ITicketService
    {
        Task<TicketListPageDto> GetTicketList(TicketListRequest request);
        Task<TicketDetailsDto> GetTicketDetails(long ticketId);
        Task<TicketDetailsDto> CreateTicket(TicketCreateRequest request);
        Task<TicketDetailsDto> UpdateTicket(TicketUpdateRequest request);
    }
}
