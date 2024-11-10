using Microsoft.Extensions.DependencyInjection;
using Support.Application.Contracts.TicketReplies;
using Support.Application.Contracts.Tickets;
using Support.Application.TicketReplies;
using Support.Application.Tickets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddTransient<ITicketService, TicketService>();
            services.AddTransient<ITicketReplyService, TicketReplyService>();
            return services;
        }
    }
}
