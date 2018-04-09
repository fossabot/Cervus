using Autofac;

namespace Cervus.Web.AppStart.AppModules
{
    interface IConfigurableContainer
    {
        void ConfigureContainer(ContainerBuilder builder);
    }
}
