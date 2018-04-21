using System;
using Autofac;
using Cervus.Context.AspNetCore;

namespace Cervus.Context.Wire
{
    public class ContextIntegratedAutofac : Module
    {
        public ContextIntegratedAutofac() : base()
        {
        }

        protected override void Load(ContainerBuilder builder)
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            base.Load(builder);

            builder
                .RegisterType<ServerContext>()
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
        }
    }
}
