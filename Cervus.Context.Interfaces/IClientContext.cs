using System.Globalization;

namespace Cervus.Context
{
    public interface IClientContext
    {
        CultureInfo CultureInfo { get; }
    }
}
