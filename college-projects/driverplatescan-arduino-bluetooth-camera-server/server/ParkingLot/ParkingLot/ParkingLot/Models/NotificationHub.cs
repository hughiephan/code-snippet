using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingLot.Models
{
    public class NotificationHub:Hub
    {
        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
    }
}
