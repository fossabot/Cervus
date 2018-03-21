import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Routes } from './Routes';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import { BaseRouteBinder } from './routing/RouteBinder';
import { RouteResolver } from './routing/RouteBinder';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Layout } from './components/Layout';

function buildRoutes(): RouteResolver {
    const routeBinder = new BaseRouteBinder();

    // Bind the routes per component. These routes should be fed
    // By the server.
    routeBinder.register(FetchData, "/fetch-data-lol");
    routeBinder.register(Counter, "/counter-lol");
    routeBinder.register(Home, "/home-lol");

    return routeBinder.build();
}

function renderApp(routeResolver: RouteResolver) {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter children={
                <Routes routeResolver={routeResolver}>{}</Routes>} basename={baseUrl}
            />
        </AppContainer>,
        document.getElementById('react-app')
    );
}
renderApp(buildRoutes());

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        renderApp(buildRoutes());
    });
}
