using System;
using Autofac;
using Cervus.Content.Dummy;

namespace Cervus.Content.Wire
{
    public class ContentDummyAutofac : Module
    {
        public ContentDummyAutofac() : base()
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
                .RegisterType<DummyStoreFrontBindings>()
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
        }
    }
}
