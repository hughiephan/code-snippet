using ParkingLot.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingLot.Models
{
    public class Result
    {
        public string status { get; set; }
        public object elements { get; set; }
        public string message { get; set; }
        public Result()
        {
            status = APIConstants.ERROR;
            elements = null;
            message = "";
        }
    }
}
