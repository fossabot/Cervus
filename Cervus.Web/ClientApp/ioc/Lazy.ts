import { interfaces } from "inversify";

export type AbstractNewable = string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>;
export type LazyInject = (serviceIdentifier: AbstractNewable) => (proto: any, key: string) => void;
export type LazyInjectNamed = (serviceIdentifier: AbstractNewable, named: string) => (proto: any, key: string) => void;
export type LazyInjectTagged = (serviceIdentifier: AbstractNewable, key: string, value: any) =>
    (proto: any, propertyName: string) => void;
export type LazyMultiInject = (serviceIdentifier: AbstractNewable) => (proto: any, key: string) => void;

export interface LazyDecorators {
    lazyInject: LazyInject;
    lazyInjectNamed: LazyInjectNamed;
    lazyInjectTagged: LazyInjectTagged;
    lazyMultiInject: LazyMultiInject;
}

export class Lazy {
    /**
     * Exports a lazy inject function which allows for properties to be injected in
     * a DI fashion.
     * @param id the element id to read from.
     */
    public static inject: LazyInject;
    public static injectNamed: LazyInjectNamed;
    public static injectTagged: LazyInjectTagged;
    public static multiInject: LazyMultiInject;

    /**
     * Binds a set of decorators to a global context. This is not meant to be called
     * more than once per application lifetime.
     * @param decorators the decorators to bind to.
     */
    public static setDecorators(decorators: LazyDecorators): void {
        Lazy.inject = decorators.lazyInject;
        Lazy.injectNamed = decorators.lazyInjectNamed;
        Lazy.injectTagged = decorators.lazyInjectTagged;
        Lazy.multiInject = decorators.lazyMultiInject;
    }
}
