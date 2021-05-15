using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using ParkingLot.Helpers;
using ParkingLot.Models;
using ParkingLot.Models.DAO;

namespace ParkingLot.Controllers
{
    [Route("api")]
    [ApiController]
    public class ParkingController : ControllerBase
    {
        //Class làm việc với db
        private readonly ApplicationDbContext _context;
        //Socket
        private readonly IHubContext<NotificationHub> _notificationHub;
        public ParkingController(ApplicationDbContext context,  IHubContext<NotificationHub> notificationHub)
        {
            _context = context;
            _notificationHub = notificationHub;
        }

        //API nhận biển số, số id của thẻ RFID
        [Route("vehicles")]
        public async Task<Result> Vehicles([FromBody]VehicleInfo vehicleInfo)
        {
            //Đối tượng return về sau khi xử lý
            Result rs = new Result();
            //Kiểm tra token
            var user = _context.Users.FirstOrDefault(us => us.Token.Equals(vehicleInfo.token.Trim()));
            //Nếu token sai
            if (user == null)
            {
                rs.status = APIConstants.ERROR;
                rs.message = "Tài khoản không tồn tại";
                return rs;
            }
            else
            {
                //Nếu token đúng
                rs.status = APIConstants.SUCCESS;
                //Kiểm tra xem xe có ở trong bãi hay ko
                var checkExist = _context.Parkings.FirstOrDefault(pk => pk.CardId.Equals(vehicleInfo.cardId) && pk.UserUidOut == null);
                //Nếu có xe trong bãi trùng với id thẻ
                // Console.WriteLine(vehicleInfo.vehiclePlatesImg);
                System.IO.File.WriteAllText(@"WriteText.txt", vehicleInfo.vehiclePlatesImg);

                Console.WriteLine("Nhan du lieu");

                if (checkExist != null)
                {
                    //Gọi API nhận dạng biển số xe
                    string plate = await Utils.PlatesRecognizer(vehicleInfo.vehiclePlatesImg);
                    //Cho biển số thành chữ hoa
                    plate = plate.ToUpper();
                    //Lấy thời gian hiện tại
                    var currentTime = DateTime.Now;
                    //Nếu biển số xe lấy ra trùng với biển số xe vào (Cùng ID thẻ RFID)
                    if (plate.Trim().Equals(checkExist.LicencePlateIn.Trim()))
                    {
                       //Tính tổng thời gian gửi, ở đây giả định cứ 5h gửi thì thu 3000 VNĐ
                        int totalHour = (int)currentTime.Subtract(checkExist.TimeIn).TotalHours;
                        string totalCost = "";
                        if (totalHour <= 5)
                        {
                            totalCost = "3000 VNĐ";
                        }
                        else
                        {
                            totalCost = ((long)(totalHour / 5) * 3000) + " VNĐ";
                        }

                        checkExist.TimeOut = currentTime;
                        checkExist.UserUidOut = user.Uid;
                        checkExist.TotalHours = totalHour;
                        checkExist.LicencePlateOut = plate;
                        checkExist.LicencePlateImgOut = vehicleInfo.vehiclePlatesImg;
                        //Cập nhật trạng thái xe: thời gian xe ra, biển số ra, người nhận thẻ
                        _context.Parkings.Update(checkExist);
                        _context.SaveChanges();
                        //Bắn socket tới giao diện client để hiển thị biển số xe và giá tiền
                        await _notificationHub.Clients.All.SendAsync("ShowPlateOut", checkExist.LicencePlateIn, checkExist.LicencePlateImgIn, plate, vehicleInfo.vehiclePlatesImg, checkExist.TimeIn.ToString("dd/MM/yyyy HH:mm:ss"), currentTime.ToString("dd/MM/yyyy HH:mm:ss"), totalHour, totalCost, "Match");
                    }
                    else
                    {
                        ///Bắn socket tới giao diện client để hiển thị biển số xe và cảnh báo lấy nhầm xe
                        await _notificationHub.Clients.All.SendAsync("ShowPlateOut", checkExist.LicencePlateIn, checkExist.LicencePlateImgIn, plate, vehicleInfo.vehiclePlatesImg, checkExist.TimeIn.ToString("dd/MM/yyyy HH:mm:ss"), currentTime.ToString("dd/MM/yyyy HH:mm:ss"), "0","0 VNĐ", "NotMatch");
                    }
                }
                else
                {
                    //Nếu xe không có trong bãi thì nhập xe vào
                    string plate = await Utils.PlatesRecognizer(vehicleInfo.vehiclePlatesImg);
                    plate = plate.ToUpper();
                    Parking parking = new Parking();
                    parking.CardId = vehicleInfo.cardId;
                    parking.UserUidIn = user.Uid;
                    parking.TimeIn = DateTime.Now;
                    parking.LicencePlateIn = plate;
                    parking.LicencePlateImgIn = vehicleInfo.vehiclePlatesImg;
                    //Thêm mới xe vào database
                    _context.Parkings.Add(parking);
                    _context.SaveChanges();
                    //Bắn socket hiển thị xe vào bãi
                    await _notificationHub.Clients.All.SendAsync("ShowPlateIn", plate.ToUpper(), vehicleInfo.vehiclePlatesImg, DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"));
                    rs.message = "Nhận xe vào thành công!";
                }

            }
            return rs;
        }
    }
}