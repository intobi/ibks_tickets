using Microsoft.AspNetCore.Mvc;
using Support.Application.Contracts.TicketReplies;
using Support.Application.Contracts.Tickets;

namespace Support.HttpApi.Controllers
{
    [ApiController]
    [Route("ticket-replies")]
    public class TicketRepliesController : ControllerBase
    {
        private readonly ITicketReplyService ticketReplyService;

        public TicketRepliesController(ITicketReplyService ticketReplyService)
        {
            this.ticketReplyService = ticketReplyService;
        }

        [HttpPost]
        public Task<TicketReplyDto> SendReply(SendTicketReplyRequest request)
        {
            return ticketReplyService.SendTicketReply(request);
        }

        [HttpGet("{ticketId}")]
        public Task<List<TicketReplyDto>> GetReplies([FromRoute] long ticketId)
        {
            return ticketReplyService.GetTicketReplies(ticketId);
        }
    }
}
