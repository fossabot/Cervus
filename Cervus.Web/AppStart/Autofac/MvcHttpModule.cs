using System;
using Autofac;
using Microsoft.AspNetCore.Http;

namespace Cervus.Web.AppStart.Autofac
{
    public class MvcHttpModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            base.Load(builder);

            builder
                .Register(t => t.Resolve<IHttpContextAccessor>().HttpContext)
                .AsSelf()
                .InstancePerLifetimeScope();
        }
    }
}
