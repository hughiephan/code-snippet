using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingLot.Helpers
{
    //Thông tin về API nhận dạng ảnh và trạng thái
    public class APIConstants
    {
        public const string SUCCESS = "success";
        public const string ERROR = "error";
        public const string RECOGNIZER_HOST = "https://api.platerecognizer.com";
        public const string RECOGNIZER_METHOD = "/v1/plate-reader";
        public const string RECOGNIZER_TOKEN = "Token de9ed7aca5cd06f07d742f7c1db9cd468f2a3c1c";
    }
}
