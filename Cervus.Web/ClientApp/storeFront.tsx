/*
 * Guidelines used: https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines
 */
import getDecorators from "inversify-inject-decorators";
import { Container } from "inversify";
import { StoreFrontModule } from './utils/StoreFrontModule';

const container = new Container();
const storeFrontModule = new StoreFrontModule();
storeFrontModule.load(container);
export const { lazyInject } = getDecorators(container);

import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import { Home } from './components/Home';
import { ReactNode } from 'react';
import { RouteBinder, Dictionary, DocumentUtils, RouteSolver } from './types';
import { StoreFront } from './components/StoreFront';

function bindRoutes(): RouteBinder {
    const routeBinder = container.get<RouteBinder>("RouteBinderId");
    const uris = container.get<DocumentUtils>("DocumentUtilsId").getAttribute<Dictionary<string>>("uris");

    // Bind the routes per component. These routes should be fed
    // by the server.
    routeBinder.bind(FetchData, uris.fetchData);
    routeBinder.bind(Counter, uris.counter);
    routeBinder.bind(Home, uris.home);

    return routeBinder;
}

function renderApp(routeBinder: RouteBinder) {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter children={<StoreFront />} basename={baseUrl} />
        </AppContainer>,
        document.getElementById('react-app')
    );
}
renderApp(bindRoutes());

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        renderApp(bindRoutes());
    });
}