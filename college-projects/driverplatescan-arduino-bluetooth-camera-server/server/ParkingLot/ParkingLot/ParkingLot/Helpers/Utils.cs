using Newtonsoft.Json;
using ParkingLot.Models.Recognizer;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ParkingLot.Helpers
{
    public class Utils
    {
        //API nhận dạng biển số xe sử dụng api.platerecognizer.com
        public static async Task<string> PlatesRecognizer(string platesImg)
        {
            try
            {
                var client = new RestClient(APIConstants.RECOGNIZER_HOST);
                var request = new RestRequest(APIConstants.RECOGNIZER_METHOD, Method.POST);
                // easily add HTTP Headers
                request.AddHeader("Authorization", APIConstants.RECOGNIZER_TOKEN);
                request.AddHeader("content-type", "application/json");

                request.AddJsonBody(new
                {
                    upload=platesImg
                });

                IRestResponse response = await client.ExecuteAsync(request);
                if (response.StatusCode != HttpStatusCode.Created)
                {
                    return "";
                }
                //Chuyển đổi giá trị biển số trả về
                var lstResult = JsonConvert.DeserializeObject<Recognization>(response.Content);
                return lstResult.results[0].plate;

            }
            catch(Exception e)
            {
                return "";
            }
        }
    }
}
