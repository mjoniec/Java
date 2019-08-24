using System.Net.Http;
using System.Threading.Tasks;
using Data.Model.Common;
using Microsoft.AspNetCore.Mvc;

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

            var goldPrices = task.Result;

            return GoldPricesSerializer.Serialize(goldPrices);
        }

        private async Task<GoldPrices> GetGoldDataDaily()
        {
            var client = HttpClientFactory.Create();
            var httpResponse = await client.GetAsync("https://localhost:44350/Gold/GetDataPrepared");
            var body = await httpResponse.Content.ReadAsStringAsync();
            var isRequestIdValid = ushort.TryParse(body, out var requestId);

            if (!isRequestIdValid) return null;

            System.Threading.Thread.Sleep(3000);

            var httpResponse2 = await client.GetAsync("https://localhost:44350/Gold/GetData/" + requestId);
            var goldPrices = await httpResponse2.Content.ReadAsAsync<GoldPrices>();

            return goldPrices;
        }
    }
}
