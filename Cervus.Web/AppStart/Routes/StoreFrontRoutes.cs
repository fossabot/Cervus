using Cervus.Content.Interfaces;
using Cervus.Context;
using InjectableRoutes.AspNetCore;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;

namespace Cervus.Web.AppStart.Routes
{
    /// <summary>
    /// Maps the SPA StoreFront Routes.
    /// </summary>
    public class StoreFrontRoutes : IInjectableRoute
    {
        private readonly IStoreFrontBindings _storeFrontBindings;
        private readonly IServerContext _serverContext;

        public StoreFrontRoutes(IStoreFrontBindings storeFrontBindings,
            IServerContext serverContext)
        {
            _storeFrontBindings = storeFrontBindings;
            _serverContext = serverContext;
        }

        public bool ValidateRoute(HttpContext httpContext)
        {
            if (httpContext == null)
            {
                throw new ArgumentNullException(nameof(httpContext));
            }

            var path = httpContext.Request.Path.Value;
            var uris = _storeFrontBindings
                .GetUris(_serverContext.DomainInfo)
                .Select(t => t.Uri);

            return uris.Contains(path, StringComparer.CurrentCultureIgnoreCase);
        }
    }
}
