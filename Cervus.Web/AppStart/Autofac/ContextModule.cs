using System;
using Autofac;
using Cervus.Web.AppStart.Autofac.Helpers;
using Cervus.Web.AppStart.Configuration.Models;

namespace Cervus.Web.AppStart.Autofac
{
    public class ContextModule : Module
    {
        private readonly IntegrationsContainer _integrations;

        public ContextModule(IntegrationsContainer integrations)
        {
            _integrations = integrations;
        }

        protected override void Load(ContainerBuilder builder)
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            base.Load(builder);

            var module = _integrations.GetModule("Context");
            builder.RegisterModule(module);
        }
    }
}
