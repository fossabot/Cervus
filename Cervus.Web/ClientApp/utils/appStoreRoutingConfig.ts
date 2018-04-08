import { Counter } from "../components/Counter";
import { FetchData } from "../components/FetchData";
import { Home } from "../components/Home";
import { RouteBinder, Dictionary } from "../types";

export module AppStoreRoutingConfig {
    export function bindRoutes(routeBinder: RouteBinder, uris: Dictionary<string>) {
        // Bind the routes per component. These routes should be fed
        // by the server.
        routeBinder.bind(FetchData, uris.fetchData);
        routeBinder.bind(Counter, uris.counter);
        routeBinder.bind(Home, uris.home);
    }
}
