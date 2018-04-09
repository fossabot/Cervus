using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace Cervus.Web.AppStart.AppModules
{
    public interface IConfigurable
    {
        void Configure(IApplicationBuilder app, IHostingEnvironment env);
    }
}
