using Microsoft.AspNetCore.Builder;
using System;

namespace InjectableRoutes.AspNetCore
{
    public static class MapWhenExtensions
    {
        public static IApplicationBuilder MapWhen<T>(this IApplicationBuilder app,
            Action<IApplicationBuilder> configuration)
            where T : IInjectableRoute
        {
            if (app == null)
            {
                throw new ArgumentNullException(nameof(app));
            }

            return app.MapWhen(InjectableRouteFactory.CreateInjectableRoute<T>(),
                configuration);
        }
    }
}
