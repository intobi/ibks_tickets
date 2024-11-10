using Microsoft.EntityFrameworkCore;
using Support.Application.Contracts.TicketReplies;
using Support.DataAccess.EfCore;
using Support.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Support.Application.TicketReplies
{
    public class TicketReplyService : ITicketReplyService
    {
        private readonly SupportContext db;

        public TicketReplyService(SupportContext db)
        {
            this.db = db;
        }

        public async Task<List<TicketReplyDto>> GetTicketReplies(long ticketId)
        {
            var ticket = await db.Tickets.FirstAsync(x => x.Id == ticketId);
            var ticketReplies = await db.TicketReplies
                .Where(x => x.Tid == ticketId)
                .ToListAsync();

            return ticketReplies
                .Select(MapReply)
                .ToList();
        }

        public async Task<TicketReplyDto> SendTicketReply(SendTicketReplyRequest request)
        {
            var ticket = await db.Tickets.FirstAsync(x => x.Id == request.TicketId);
            var newReply = new TicketReply()
            {
                Reply = request.ReplyText,
                ReplyDate = DateTime.UtcNow,
                Tid = request.TicketId,
            };

            db.TicketReplies.Add(newReply);

            await db.SaveChangesAsync();

            return MapReply(newReply);
        }

        private static TicketReplyDto MapReply(TicketReply reply)
            => new TicketReplyDto()
            {
                ReplyDate = reply.ReplyDate,
                Text = reply.Reply,
            };
    }
}
