using Autofac;

namespace Cervus.Web.AppStart.AppModules
{
     public interface IConfigurableContainer
    {
        void ConfigureContainer(ContainerBuilder builder);
    }
}
