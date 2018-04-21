using System.IO;
using Autofac.Extensions.DependencyInjection;
using Cervus.Web.AppStart.AppModules;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace Cervus.Web
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseKestrel()
                .ConfigureServices(services => services.AddAutofac())
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();
    }
}
