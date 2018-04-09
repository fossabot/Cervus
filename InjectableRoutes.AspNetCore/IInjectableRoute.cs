using Microsoft.AspNetCore.Http;

namespace InjectableRoutes.AspNetCore
{
    public interface IInjectableRoute
    {
        bool ValidateRoute(HttpContext httpContext);
    }
}
