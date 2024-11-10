using Azure.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.IdentityModel.Tokens;
using Support.Application.Contracts.Tickets;
using Support.DataAccess.EfCore;
using Support.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Support.Application.Tickets
{
    public class TicketService : ITicketService
    {
        private readonly SupportContext db;

        public TicketService(SupportContext db)
        {
            this.db = db;
        }

        public async Task<TicketDetailsDto> CreateTicket(TicketCreateRequest request)
        {
            var newStatus = await db.Statuses.FirstAsync(x => x.Title == "New");
            var ticketType = await db.TicketTypes.FirstAsync(x => x.Id == request.TypeId);
            var ticketPriority = await db.Priorities.FirstAsync(x => x.Id == request.PriorityId);
            var ticketDate = DateTime.UtcNow;

            var ticket = new Ticket()
            {
                Title = request.Title,
                Description = request.Description,
                ApplicationId = request.ApplicationId,
                ApplicationName = request.ApplicationName,
                PriorityId = ticketPriority.Id,
                TicketTypeId = ticketType.Id,
                StatusId = newStatus.Id,
                Date = ticketDate,
                InstalledEnvironmentId = 1,
                UserId = 1,
            };

            db.Tickets.Add(ticket);

            await db.SaveChangesAsync();

            return MapToDetails(ticket);
        }

        public async Task<TicketListPageDto> GetTicketList(TicketListRequest request)
        {
            string? titlePattern = request.TitleFilter.IsNullOrEmpty() ? null : $"%{request.TitleFilter}%";

            IQueryable<Ticket> filteredItems = db.Tickets;
            if (titlePattern != null)
                filteredItems = filteredItems.Where(x => EF.Functions.Like(x.Title, titlePattern));

            int total = await filteredItems.CountAsync();
            var pagedItems = await filteredItems
                .OrderByDescending(x => x.Date)
                .Skip(request.PageSize * request.Page)
                .Take(request.PageSize)
                .Include(x => x.Status)
                .Include(x => x.Priority)
                .Include(x => x.TicketType)
                .Select(x => new
                {
                    Status = x.Status.Title,
                    x.ApplicationName,
                    x.Date,
                    x.Id,
                    Priority = x.Priority.Title,
                    x.Title,
                    Type = x.TicketType.Title,
                })
                .ToListAsync();

            var itemDtos = pagedItems
                .Select(x => new TicketListItemDto()
                {
                    Status = x.Status,
                    ApplicationName = x.ApplicationName,
                    Date = x.Date,
                    Id = x.Id,
                    Priority = x.Priority,
                    Title = x.Title,
                    Type = x.Type,
                })
                .ToList();

            return new()
            {
                PageSize = request.PageSize,
                Items = itemDtos,
                Page = request.Page,
                TotalPages = Convert.ToInt32(Math.Ceiling((double)total / (double)request.PageSize)),
            };
        }

        public async Task<TicketDetailsDto> UpdateTicket(TicketUpdateRequest request)
        {
            var ticketStatus = await db.Statuses.FirstAsync(x => x.Id == request.StatusId);
            var ticketType = await db.TicketTypes.FirstAsync(x => x.Id == request.TypeId);
            var ticketPriority = await db.Priorities.FirstAsync(x => x.Id == request.PriorityId);
            var ticket = await db.Tickets.FirstAsync(x => x.Id == request.TicketId);

            ticket.Title = request.Title;
            ticket.Description = request.Description;
            ticket.ApplicationName = request.ApplicationName;
            ticket.ApplicationId = request.ApplicationId;
            ticket.PriorityId = request.PriorityId;
            ticket.TicketTypeId = request.TypeId;
            ticket.StatusId = request.StatusId;

            db.Tickets.Update(ticket);

            await db.SaveChangesAsync();

            return MapToDetails(ticket);
        }

        public async Task<TicketDetailsDto> GetTicketDetails(long ticketId)
        {
            var ticket = await db.Tickets.FirstAsync(x => x.Id == ticketId);
            return MapToDetails(ticket);
        }

        private static TicketDetailsDto MapToDetails(Ticket ticket)
            => new()
            {
                StatusId = ticket.StatusId,
                ApplicationId = ticket.ApplicationId,
                Date = ticket.Date,
                Description = ticket.Description,
                Id = ticket.Id,
                PriorityId = ticket.PriorityId,
                Title = ticket.Title,
                TypeId = ticket.TicketTypeId,
            };
    }
}
