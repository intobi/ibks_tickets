﻿using System;
using System.Collections.Generic;

namespace Support.DataAccess.Models;

public partial class LogType
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public virtual ICollection<TicketEventLog> TicketEventLogs { get; set; } = new List<TicketEventLog>();
}
