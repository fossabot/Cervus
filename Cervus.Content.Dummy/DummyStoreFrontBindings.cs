using System.Collections.Generic;
using Cervus.Content.Interfaces;
using Cervus.Content.Interfaces.Models;
using Cervus.Context.Interfaces.WebDomain.Models;

namespace Cervus.Content.Dummy
{
    public class DummyStoreFrontBindings : IStoreFrontBindings
    {
        public IEnumerable<ComponentUri> GetUris(DomainInfo domainInfo)
        {
            yield return new ComponentUri("home", "/");
            yield return new ComponentUri("counter", "/counter");
            yield return new ComponentUri("fetchData", "/fetch-data");
        }
    }
}
