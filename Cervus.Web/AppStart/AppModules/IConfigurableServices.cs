using Microsoft.Extensions.DependencyInjection;

namespace Cervus.Web.AppStart.AppModules
{
    public interface IConfigurableServices
    {
        void ConfigureServices(IServiceCollection services);
    }
}
