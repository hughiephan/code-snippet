using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingLot.Models.DAO
{
    public class Parking
    {
        //Khóa chính của bảng
        [Key]
        public long Uid { get; set; }
        //Mã thẻ RFID
        public string CardId { get; set; }
        //Biển số lúc xe vào dạng text sau khi nhận dạng ảnh
        public string LicencePlateIn { get; set; }
        //Ảnh biển số lúc xe vào
        public string LicencePlateImgIn { get; set; }
        //Thời gian xe vào bãi
        public DateTime TimeIn { get; set; }
        //Biển số lúc xe ra dạng text sau khi nhận dạng ảnh
        public string LicencePlateOut { get; set; }
        //Ảnh biển số lúc xe ra
        public string LicencePlateImgOut { get; set; }
        //Thời gian xe ra bãi
        public DateTime? TimeOut { get; set; }
        //Thời gian đã gửi
        public int? TotalHours { get; set; }
        //Phí gửi xe
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ParkingCost { get; set; }
        //Uid Tài khoản nhận xe vào
        public int UserUidIn { get; set; }
        //Uid Tài khoản nhận xe ra
        public int? UserUidOut { get; set; }

    }
}
