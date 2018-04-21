namespace Cervus.Content.Interfaces.Models
{
    public class ComponentUri
    {
        private readonly string _id;
        private readonly string _pathFragment;

        public string Id => _id;
        public string PathFragment => _pathFragment;

        public ComponentUri(string id, string pathFragment)
        {
            _id = id;
            _pathFragment = pathFragment;
        }
    }
}
