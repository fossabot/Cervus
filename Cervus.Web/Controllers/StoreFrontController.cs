using System.Diagnostics;
using System.Linq;
using Cervus.Content.Interfaces;
using Cervus.Context;
using Cervus.Web.Models.StoreFront;
using Microsoft.AspNetCore.Mvc;

namespace Cervus.Web.Controllers
{
    public class StoreFrontController : Controller
    {
        private readonly IServerContext _serverContext;
        private readonly IStoreFrontBindings _storeFrontBindings;

        public StoreFrontController(IServerContext serverContext,
            IStoreFrontBindings storeFrontBindings)
        {
            _serverContext = serverContext;
            _storeFrontBindings = storeFrontBindings;
        }

        public IActionResult Index()
        {
            var uris = _storeFrontBindings
                .GetUris(_serverContext.DomainInfo)
                .ToDictionary(t => t.Id, t => t.PathFragment);

            var model = new IndexModel(uris, "https://api.chucknorris.io");
            return View(model);
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
