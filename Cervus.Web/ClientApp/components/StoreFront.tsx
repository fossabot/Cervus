import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Route } from "react-router-dom";
import * as BindingConstants from "../ioc/bindingConstants";
import { Context } from "../ioc/iocContext";
import { DefaultReactProps, RouteBinder } from "../types";
import { StoreFrontLayout } from "./StoreFrontLayout";

export class StoreFront extends React.Component<DefaultReactProps, {}> {

    @Context.lazyInject(BindingConstants.RouteBinderId)
    private readonly routeBinder: RouteBinder;

    public render() {
        const routes = this.routeBinder
            .getRoutes()
            .map(t => <Route exact key={t.value} path={t.value} component={t.key} />);

        return <StoreFrontLayout> {routes} </StoreFrontLayout>;
    }
}
