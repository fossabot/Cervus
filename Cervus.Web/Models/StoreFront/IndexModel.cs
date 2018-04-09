using System.Collections.Generic;

namespace Cervus.Web.Models.StoreFront
{
    public class IndexModel
    {
        private readonly IDictionary<string, string> _uris;
        private readonly string _contentApi;

        public IDictionary<string, string>  Uris => _uris;
        public string ContentApi => _contentApi;

        public IndexModel(IDictionary<string, string> uris, string contentApi)
        {
            _uris = uris;
            _contentApi = contentApi;
        }
    }
}
