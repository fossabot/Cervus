using Autofac;
using Cervus.Web.AppStart.Routes;
using System;

namespace Cervus.Web.AppStart.Autofac
{
    public class RoutesModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            base.Load(builder);

            builder
                .RegisterType<StoreFrontRoutes>()
                .AsSelf()
                .InstancePerLifetimeScope();
        }
    }
}
