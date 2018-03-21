import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RouteResolver } from './routing/RouteBinder';

export interface LayoutProps {
    children?: React.ReactNode;
    routeResolver: RouteResolver;
}

export class Routes extends React.Component<LayoutProps, {}> {
    _routeResolver: RouteResolver;

    constructor(props?: LayoutProps) {
        super(props);

        this._routeResolver = this.props.routeResolver
    }

    public render() {
        const routes = this._routeResolver
            .getRoutes()
            .map(t => <Route exact path={t.path} component={t.component} />);

        return <Layout routeResolver={ this._routeResolver }> {routes} </Layout>;
    }
}