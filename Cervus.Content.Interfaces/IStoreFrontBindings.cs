using System.Collections.Generic;
using Cervus.Content.Interfaces.Models;
using Cervus.Context.Interfaces.WebDomain.Models;

namespace Cervus.Content.Interfaces
{
    public interface IStoreFrontBindings
    {
        IEnumerable<ComponentUri> GetUris(DomainInfo domainInfo);
    }
}
