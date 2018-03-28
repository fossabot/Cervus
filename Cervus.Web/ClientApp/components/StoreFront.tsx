/*
 * Guidelines used: https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines
 */
import * as BindingConstants from "../utils/BindingConstants";
import * as React from 'react';
import { lazyInject } from '../storeFront';
import { Route } from 'react-router-dom';
import { RouteBinder, DefaultReactProps } from '../types';
import { RouteComponentProps } from 'react-router';
import { StoreFrontLayout } from './StoreFrontLayout';

export class StoreFront extends React.Component<DefaultReactProps, {}> {

    @lazyInject(BindingConstants.RouteBinderId)
    private routeBinder: RouteBinder;

    public render() {
        const routes = this.routeBinder
            .getRoutes()
            .map(t => <Route exact path={t.value} component={t.key} />);

        return <StoreFrontLayout> {routes} </StoreFrontLayout>;
    }
}