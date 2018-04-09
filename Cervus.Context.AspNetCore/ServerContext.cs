using Cervus.Context.WebDomain.Models;
using Microsoft.AspNetCore.Http;

namespace Cervus.Context.AspNetCore
{
    public class ServerContext : IServerContext
    {
        private readonly HttpContext _httpContext;

        public ServerContext(HttpContext httpContext)
        {
            _httpContext = httpContext;
        }

        public DomainInfo DomainInfo => new DomainInfo
        {
            Host = _httpContext.Request.Host.Host
        };
    }
}
