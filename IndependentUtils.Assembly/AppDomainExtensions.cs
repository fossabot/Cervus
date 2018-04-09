using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using AssemblyInfo = System.Reflection.Assembly;

namespace IndependentUtils.Assembly
{
    public static class AppDomainExtensions
    {
        private static readonly object _lock = new object();

        public static IEnumerable<AssemblyInfo> GetAllReferencedAssemblies(this AppDomain appDomain)
        {
            if (appDomain == null)
            {
                throw new ArgumentNullException(nameof(appDomain));
            }

            lock (_lock)
            {
                var loadedAssemblies = appDomain
                    .GetAssemblies();

                var loadedPaths = new HashSet<string>(loadedAssemblies
                    .Where(t => !t.IsDynamic)
                    .Select(a => a.Location));

                var missingReferencedPaths = Directory
                    .GetFiles(AppDomain
                        .CurrentDomain
                        .BaseDirectory, "*.dll")
                    .Where(r => !loadedPaths.Contains(r, StringComparer.InvariantCultureIgnoreCase))
                    .Select(path => appDomain.Load(AssemblyName.GetAssemblyName(path)));

                return loadedAssemblies
                    .Concat(missingReferencedPaths)
                    .ToList();
            }
        }
    }
}
