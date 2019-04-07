using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace GoldChart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoldDataController : ControllerBase
    {
        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        [HttpGet("[action]")]
        public string GoldDaily()
        {
            var gold = new Gold
            {
                goldData = new List<GoldDataDay>()
                //{
                //    new GoldDataDay
                //    {
                //        Date = "2010-6-29",
                //        Open = (float)15.89
                //    },
                //    new GoldDataDay
                //    {
                //        Date = "2010-6-30",
                //        Open = (float)25.73
                //    }
                //}
            };

            foreach(var g in GetAll())
            {
                var array = g.Split(',');
                var r = float.TryParse(array[1], NumberStyles.Any, CultureInfo.InvariantCulture, out var f);

                gold.goldData.Add(new GoldDataDay
                {
                    Date = array[0],
                    Open = f
                });
            }

            var s = JsonConvert.SerializeObject(gold, Formatting.None);

            return s;
        }

        private IEnumerable<string> GetAll()
        {
            var list = new List<string>
            {
                "2010-6-29,15.9",
                "2010-6-30,25.9"
            };

            return list;
        }

        internal class Gold
        {
            [JsonProperty("goldData")]
            internal List<GoldDataDay> goldData;
        }

        internal class GoldDataDay
        {
            [JsonProperty("Date")]
            internal string Date;

            [JsonProperty("Open")]
            internal float Open;
        }

        //// GET: api/GoldData
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/GoldData/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST: api/GoldData
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT: api/GoldData/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}

        private static string[] Summaries = new[]
{
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
