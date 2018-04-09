namespace Cervus.Content.Interfaces.Models
{
    public class ComponentUri
    {
        private readonly string _id;
        private readonly string _uri;

        public string Id => _id;
        public string Uri => _uri;

        public ComponentUri(string id, string uri)
        {
            _id = id;
            _uri = uri;
        }
    }
}
