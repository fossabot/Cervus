import { injectable } from "inversify";
import { RouteComponentProps } from "react-router-dom";

import { BaseRouteSolver } from "./BaseRouteSolver";
import { Dictionary, KeyValuePair, Named, ReactComponentClass, RouteBinder, RouteSolver } from "../types";

/**
 * A RouteSolver factory which allows for components to be bound
 * to actions. The build method returns a concrete BaseRouteResolver.
 */
@injectable()
export class BaseRouteBinder implements RouteBinder {
    private mappedTypes: Dictionary<KeyValuePair<ReactComponentClass, string>>;

    constructor() {
        this.mappedTypes = {};
    }

    /**
     * Binds a component to a path.
     * @param {ReactComponentClass} type - A component to bind an action to.
     * @param {string} action - The path to bind the component to.
     */
    public bind(type: ReactComponentClass, action: string): void {
        if (!type) {
            throw new Error("Type is invalid!");
        }

        const typeAsNamed = (type as any) as Named;
        const typeName = typeAsNamed.name;
        if (!typeName) {
            throw new Error("Type is invalid!");
        }

        this.mappedTypes[typeName] = {
            key: type,
            value: action
        };
    }

    /**
     * Builds a RouteSolver which allows the bound actions to be fetched from
     * the component.
     * @returns {RouteSolver} - A readonly container of routes that can resolve
     * a component to a path.s
     */
    public getRoutes(): Array<KeyValuePair<ReactComponentClass, string>> {
        return Object
            .keys(this.mappedTypes)
            .map(key => {
                const value = this.mappedTypes[key];
                return {
                    key: value.key,
                    value: value.value
                };
            });
    }

    /**
     * Gets the bound routes into a key value pair so that they can be set into the
     * router.
     */
    public build(): RouteSolver {
        return new BaseRouteSolver(this.mappedTypes);
    }
}
