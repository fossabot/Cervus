using Autofac.Core;
using Cervus.Web.AppStart.Configuration.Models;
using IndependentUtils.Assembly;
using System;
using System.Linq;

namespace Cervus.Web.AppStart.Autofac.Helpers
{
    public static class IntegrationsContainerExtensions
    {
        public static IModule GetModule(this IntegrationsContainer integrationsContainer, 
            string integrationName)
        {
            if (integrationsContainer == null)
            {
                throw new ArgumentNullException(nameof(integrationsContainer));
            }
            if (string.IsNullOrWhiteSpace(integrationName))
            {
                throw new ArgumentNullException(nameof(integrationName));
            }

            var content = integrationsContainer.Integrations[integrationName];
            var assemblyName = content.Assembly;
            var referenceAssembly = AppDomain
                .CurrentDomain
                .GetAllReferencedAssemblies()
                .FirstOrDefault(t => t
                    .GetName()
                    .Name
                    .IndexOf(assemblyName,
                        StringComparison.InvariantCultureIgnoreCase) >= 0);

            if (referenceAssembly == null)
            {
                throw new InvalidOperationException($"There's no Assembly named {assemblyName}.");
            }

            var moduleName = content.Module;
            var moduleType = referenceAssembly
                .GetTypes()
                .FirstOrDefault(t => t.Name.Equals(moduleName, StringComparison.InvariantCultureIgnoreCase));

            if (moduleType == null)
            {
                throw new InvalidOperationException(
                    $"There's no Module named {moduleName} in {assemblyName}.");
            }

            return (IModule)Activator.CreateInstance(moduleType);
        }
    }
}
