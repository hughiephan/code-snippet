using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ParkingLot.Helpers;
using ParkingLot.Models;
using ParkingLot.Models.DAO;

namespace ParkingLot.Controllers
{
    public class HomeController : Controller
    {
        //class làm việc với database
        private readonly ApplicationDbContext _context;
        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        //Trang đăng nhập
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(string username, string password)
        {

            try
            {
                //Kiểm tra tài khoản có tồn tại hay ko
                var user = _context.Users.FirstOrDefault(us => us.UserName.Equals(username.Trim()) && password.Equals(password.Trim()));
                //Nếu tài khoản tồn tại thì set phiên đăng nhập
                if (user != null)
                {
                    HttpContext.Session.SetString("username", user.UserName);
                }
                else
                {
                    // tài khoản không tồn tại trả về lỗi
                    return Json(new { status = APIConstants.ERROR, message="Tài khoản hoặc mật khẩu không tồn tại." });
                }
            }
            catch(Exception e)
            {
                //Lỗi phát sinh trong quá trình đăng nhập
                return Json(new { status = APIConstants.ERROR, message = "Lỗi đăng nhập" });
            }
            return Json(new { status = APIConstants.SUCCESS });
        }


        //Giao diện nhập xe vào ra
        [Route("/nhap-xuat-xe")]
        [HttpGet]
        public IActionResult EntranceGate()
        {
            //Kiểm tra phiên đăng nhập (session)
            string username = HttpContext.Session.GetString("username") ?? "";
            //Nếu chưa đăng nhập thì quay lại trang login
            // if (username == "")
            // {
            //     return LocalRedirect("Login");
            // }
            //Trường hợp đã đăng nhập thì hiển thị giao diện nhập xuất xe
            return View();
        }

        //Trang báo lỗi (ko dùng)
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
