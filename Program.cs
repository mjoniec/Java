using System;

namespace GoldPricesExternalRestApiClient
{
    class Program
    {
        static void Main(string[] args)
        {
            var goldPricesClient = new GoldPricesClient();
            string s = string.Empty;

            goldPricesClient.Get().ContinueWith(t =>
            {
                s = t.Result;
            })
            .Wait();

            Console.WriteLine("Hello World!");
            Console.WriteLine(s);
        }
    }
}
