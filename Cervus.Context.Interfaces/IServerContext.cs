using Cervus.Context.Interfaces.WebDomain.Models;

namespace Cervus.Context
{
    public interface IServerContext
    {
        DomainInfo DomainInfo { get; }
    }
}
