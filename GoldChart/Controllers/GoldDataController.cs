using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace GoldChart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoldDataController : ControllerBase
    {
        [HttpGet("[action]")]
        public string GoldDaily()
        {
            var task = GetGoldDataDaily();

            task.Wait();

            var goldDataDaily = task.Result;
            var gold = new Gold
            {
                goldData = Gold.GetGoldDataDaily(goldDataDaily)
            };

            return JsonConvert.SerializeObject(gold, Formatting.None);
        }

        private async Task<Dictionary<DateTime, double>> GetGoldDataDaily()
        {
            var client = HttpClientFactory.Create();
            var httpResponse = await client.GetAsync("https://localhost:44350/api/Gold");
            var body = await httpResponse.Content.ReadAsStringAsync();
            var isRequestIdValid = ushort.TryParse(body, out var requestId);

            if (!isRequestIdValid) return null;

            System.Threading.Thread.Sleep(3000);

            var httpResponse2 = await client.GetAsync("https://localhost:44350/api/Gold/GetAll/" + requestId.ToString());
            var goldDataDaily = await httpResponse2.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<Dictionary<DateTime, double>>(goldDataDaily);
        }

        internal class Gold
        {
            [JsonProperty("goldData")]
            internal List<GoldDataDay> goldData;

            internal static List<GoldDataDay> GetGoldDataDaily(Dictionary<DateTime, double> goldDataDaily)
            {
                var goldData = new List<GoldDataDay>();

                foreach (var g in goldDataDaily)
                {
                    goldData.Add(new GoldDataDay
                    {
                        Date = g.Key.ToString("yyyy-M-d"),
                        Open = g.Value
                    });
                }

                return goldData;
            }
        }

        internal class GoldDataDay
        {
            [JsonProperty("Date")]
            internal string Date;

            [JsonProperty("Open")]
            internal double Open;
        }
    }
}
