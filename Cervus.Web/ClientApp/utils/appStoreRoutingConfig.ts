import { RouteBinder, Dictionary } from "../types";
import { FetchData } from "../components/FetchData";
import { Counter } from "../components/Counter";
import { Home } from "../components/Home";

export module AppStoreRoutingConfig {
    export function bindRoutes(routeBinder: RouteBinder, uris: Dictionary<string>) {
        // Bind the routes per component. These routes should be fed
        // by the server.
        routeBinder.bind(FetchData, uris.fetchData);
        routeBinder.bind(Counter, uris.counter);
        routeBinder.bind(Home, uris.home);
    }
}