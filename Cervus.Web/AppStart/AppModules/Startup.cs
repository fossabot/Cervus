using Autofac;
using Cervus.Web.AppStart.Autofac;
using Cervus.Web.AppStart.Configuration.Models;
using Cervus.Web.AppStart.Routes;
using InjectableRoutes.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System.IO;

namespace Cervus.Web.AppStart.AppModules
{
    public class Startup : IConfigurableServices, IConfigurableContainer, IConfigurable
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IConfiguration _configuration;

        public Startup(IHostingEnvironment hostingEnvironment, IConfiguration configuration)
        {
            _hostingEnvironment = hostingEnvironment;
            _configuration = configuration;
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add
        /// services to the container.
        /// </summary>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddRouting();
        }

        /// <summary>
        /// ConfigureContainer is where you can register things directly
        /// with Autofac. This runs after ConfigureServices so the things
        /// here will override registrations made in ConfigureServices.
        /// Don't build the container; that gets done for you. If you
        /// need a reference to the container, you need to use the
        /// "Without ConfigureContainer" mechanism shown later.
        /// </summary>
        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder
                .RegisterInstance(_configuration)
                .AsImplementedInterfaces()
                .SingleInstance();

            builder
                .RegisterInstance(_hostingEnvironment)
                .AsImplementedInterfaces()
                .SingleInstance();

            var integrationsSection = _configuration.GetSection("Integrations");
            var integrations = integrationsSection.Get<IntegrationsLocation>();
            var location = integrations.Location;
            var filePath = Path.Combine(_hostingEnvironment.ContentRootPath, location);

            var integrationsDictionary = JsonConvert
                .DeserializeObject<IntegrationsContainer>(File.ReadAllText(filePath));

            var contentModule = new ContentModule(integrationsDictionary);
            builder.RegisterModule(contentModule);

            var contextModule = new ContextModule(integrationsDictionary);
            builder.RegisterModule(contextModule);

            builder.RegisterModule<RoutesModule>();
            builder.RegisterModule<MvcHttpModule>();
            builder.RegisterModule<NewtonsoftJsonModule>();
        }

        // This method gets called by the runtime. Use this method to configure
        // the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/StoreFront/Error");
            }

            app.UseStaticFiles();
            app.UseMvc(routes => routes.MapRoute(
                name: "default",
                template: "{controller=Home}/{action=Index}/{id?}"));

            // This will resolve and "register" the routes for the StoreFront 
            // Single Page Application.
            app.MapWhen<StoreFrontRoutes>(builder => builder
                .UseMvc(routes => routes
                    .MapSpaFallbackRoute("store-front-spa", new
                    {
                        controller = "StoreFront",
                        action = "Index"
                    })));
        }
    }
}
