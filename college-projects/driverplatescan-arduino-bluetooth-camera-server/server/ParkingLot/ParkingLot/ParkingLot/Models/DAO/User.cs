using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingLot.Models.DAO
{
    public class User
    {
        [Key]
        public int Uid { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Token { get; set; }
        public string role { get; set; }
    }
}
