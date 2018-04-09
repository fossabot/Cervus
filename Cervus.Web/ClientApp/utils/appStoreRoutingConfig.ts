import { Counter } from "../components/Counter";
import { FetchData } from "../components/FetchData";
import { Home } from "../components/Home";
import { Dictionary, RouteBinder } from "../types";

export class AppStoreRoutingConfig {
    public static bindRoutes(routeBinder: RouteBinder, uris: Dictionary<string>) {
        // Bind the routes per component. These routes should be fed
        // by the server.
        routeBinder.bind(FetchData, uris.fetchData);
        routeBinder.bind(Counter, uris.counter);
        routeBinder.bind(Home, uris.home);
    }
}
