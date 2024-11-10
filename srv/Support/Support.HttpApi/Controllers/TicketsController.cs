using Microsoft.AspNetCore.Mvc;
using Support.Application.Contracts.Tickets;

namespace Support.HttpApi.Controllers
{
    [ApiController]
    [Route("tickets")]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketService ticketService;

        public TicketsController(ITicketService ticketService)
        {
            this.ticketService = ticketService;
        }

        [HttpGet]
        public Task<TicketListPageDto> GetList(TicketListRequest request)
        {
            return ticketService.GetTicketList(request);
        }

        [HttpPut]
        public Task<TicketDetailsDto> Update(TicketUpdateRequest request)
        {
            return ticketService.UpdateTicket(request);
        }

        [HttpPost]
        public Task<TicketDetailsDto> Create(TicketCreateRequest request)
        {
            return ticketService.CreateTicket(request);
        }

        [HttpGet("{ticketId}")]
        public Task<TicketDetailsDto> GetDetails([FromRoute] long ticketId)
        {
            return ticketService.GetTicketDetails(ticketId);
        }
    }
}
