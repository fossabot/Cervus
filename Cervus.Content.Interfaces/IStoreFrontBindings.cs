﻿using Cervus.Content.Interfaces.Models;
using Cervus.Context.WebDomain.Models;
using System.Collections.Generic;

namespace Cervus.Content.Interfaces
{
    public interface IStoreFrontBindings
    {
        IEnumerable<ComponentUri> GetUris(DomainInfo domainInfo);
    }
}
