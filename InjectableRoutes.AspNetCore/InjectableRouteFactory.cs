using Microsoft.AspNetCore.Http;
using System;

namespace InjectableRoutes.AspNetCore
{
    public static class InjectableRouteFactory
    {
        public static Func<HttpContext, bool> CreateInjectableRoute<T>()
            where T : IInjectableRoute
        {
            return ValidateRoute<T>;
        }

        private static bool ValidateRoute<T>(HttpContext httpContext)
        {
            if (httpContext == null)
            {
                throw new ArgumentNullException(nameof(httpContext));
            }

            var service = httpContext
                .RequestServices
                .GetService(typeof(T)) as IInjectableRoute;

            if (service == null)
            {
                throw new InvalidOperationException(
                    $"Failed to load the module {typeof(T).Name}, " +
                    "please check if it's registered.");
            }

            // Convert the Route into a predicate.
            return service.ValidateRoute(httpContext);
        }
    }
}
