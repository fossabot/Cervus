import { Container, interfaces } from "inversify";
import { DOMAttributes } from "react";
import { RouteComponentProps } from "react-router-dom";

export type ReactComponentClass = React.ComponentClass<RouteComponentProps<any> | undefined>;
export type ReactEntryPointClass = React.ComponentClass<DefaultReactProps | undefined>;

export interface Dictionary<TValue> {
    [index: string]: TValue;
}

export interface KeyValuePair<TKey, TValue> {
    key: TKey;
    value: TValue;
}

export interface Named {
    name: string;
}

export interface DefaultReactProps {
    children?: React.ReactNode;
}

/**
 * @module types/RouteBinder
 * A RouteSolver factory that allows for components to be bound to paths. This
 * allows for a single point in the application where a component is bound to a
 * path.
 */
export interface RouteBinder {
    /**
     * Binds a component to a path.
     * @param {React.ComponentClass<RouteComponentProps<any> | undefined>} type -
     * A component to bind an action to.
     * @param {string} action - The path to bind the component to.
     */
    bind(type: ReactComponentClass, action: string): void;

    /**
     * Gets the bound routes into a key value pair so that they can be set into the
     * router.
     */
    getRoutes(): Array<KeyValuePair<ReactComponentClass, string>>;

    /**
     * Builds a RouteSolver which allows the bound actions to be fetched from
     * the component.
     * @returns {RouteSolver} - A readonly container of routes that can resolve
     * a component to a path.s
     */
    build(): RouteSolver;
}

/**
 * @module types/RouteSolver
 * A readonly container that allows for paths to be fetched from containers.
 */
export interface RouteSolver {
    /**
     * Gets the bound routes into a key value pair so that they can be set into the
     * router.
     * @param {React.ComponentClass<RouteComponentProps<any> | undefined>} type - a
     * react component which is has a path bound to.
     * @returns {string} - The path that the component is bound to.
     */
    action(type: ReactComponentClass): string;
}

export interface ContainerModule {
    load(container: Container): void;
}

export interface DocumentUtils {
    /**
     * Gets the mapped attribute value as an object of the T type.
     * @param {string} attributeId - The attribute to fetch.
     * @param {T} type - The type to return.
     * @returns {T} - The converted attribute if it exists, if not, an exception
     * is thrown.
     */
    getAttribute<T>(attributeId: string): T;

    getAttributeString(attributeId: string): string;
}
