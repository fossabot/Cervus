import { Route, RouteComponentProps } from "react-router";
import * as React from "react";

export interface RouteBinder {
    register(typeName: React.ComponentClass<RouteComponentProps<any> | undefined>, action: string): void;

    build(): RouteResolver;
}

export interface RouteResolver {
    action(type: React.ComponentClass<RouteComponentProps<any> | undefined>): string;

    getRoutes(): { path?: string, component: React.ComponentClass<RouteComponentProps<any> | undefined> }[];
}

export class BaseRouteBinder implements RouteBinder {
    private _mappedTypes: { [index: string]: { path: string, type: React.ComponentClass<RouteComponentProps<any> | undefined> } };

    constructor() {
        this._mappedTypes = { };
    }

    register(typeName: React.ComponentClass<RouteComponentProps<any> | undefined>, action: string): void {
        this._mappedTypes[action] = {
            path: action,
            type: typeName
        };
    }

    build(): RouteResolver {
        return new BaseRouteResolver(this._mappedTypes);
    }
}

export class BaseRouteResolver implements RouteResolver {
    private _mappedTypes: { [index: string]: { path: string, type: React.ComponentClass<RouteComponentProps<any> | undefined> } };

    constructor(mappedTypes: { [index: string]: { path: string, type: React.ComponentClass<RouteComponentProps<any> | undefined> } }) {
        this._mappedTypes = mappedTypes;
    }

    action(type: React.ComponentClass<RouteComponentProps<any> | undefined>): string {
        for (let key in this._mappedTypes) {
            let value = this._mappedTypes[key];
            if (value.type === type) {
                return value.path;
            }
        }
        return '';
    }

    getRoutes(): { path?: string, component: React.ComponentClass<RouteComponentProps<any> | undefined> }[] {
        var array: { path?: string, component: React.ComponentClass<RouteComponentProps<any> | undefined> }[] = [];

        for (let key in this._mappedTypes) {
            const curr = this._mappedTypes[key];
            array.push({
                path: curr.path,
                component: curr.type
            });
        }

        return array;
    }
}