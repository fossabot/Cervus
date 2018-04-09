using Cervus.Context.WebDomain.Models;

namespace Cervus.Context
{
    public interface IServerContext
    {
        DomainInfo DomainInfo { get; }
    }
}
