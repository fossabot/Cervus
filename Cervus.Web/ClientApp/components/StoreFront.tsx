import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Route } from "react-router-dom";

import * as BindingConstants from "../ioc/BindingConstants";
import { Lazy } from "../ioc/Lazy";
import { DefaultReactProps, RouteBinder } from "../types";
import { StoreFrontLayout } from "./StoreFrontLayout";

export class StoreFront extends React.Component<DefaultReactProps, {}> {

    @Lazy.inject(BindingConstants.RouteBinderId)
    private readonly routeBinder: RouteBinder;

    public render() {
        const routes = this.routeBinder
            .getRoutes()
            .map(t => <Route exact key={t.value} path={t.value} component={t.key} />);

        return <StoreFrontLayout> {routes} </StoreFrontLayout>;
    }
}
