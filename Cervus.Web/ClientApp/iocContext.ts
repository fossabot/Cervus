import { interfaces } from "inversify";

export module Context {
    type LazyInject =
        (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>) =>
            (proto: any, key: string) => void;
    type LazyInjectNamed =
        (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>, named: string) =>
            (proto: any, key: string) => void;
    type LazyInjectTagged =
        (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>, key: string, value: any) =>
            (proto: any, propertyName: string) => void;
    type LazyMultiInject =
        (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>) =>
            (proto: any, key: string) => void;

    interface LazyDecorators {
        lazyInject: LazyInject;
        lazyInjectNamed: LazyInjectNamed;
        lazyInjectTagged: LazyInjectTagged;
        lazyMultiInject: LazyMultiInject;
    }

    /**
     * Binds a set of decorators to a global context. This is not meant to be called
     * more than once per application lifetime.
     * @param decorators the decorators to bind to.
     */
    export function setDecorators(decorators: LazyDecorators): void {
        lazyInject = decorators.lazyInject;
        lazyInjectNamed = decorators.lazyInjectNamed;
        lazyInjectTagged = decorators.lazyInjectTagged;
        lazyMultiInject = decorators.lazyMultiInject;
    }

    /**
     * Exports a lazy inject function which allows for properties to be injected in
     * a DI fashion.
     * @param id the element id to read from.
     */
    export let lazyInject: LazyInject;
    export let lazyInjectNamed: LazyInjectNamed;
    export let lazyInjectTagged: LazyInjectTagged;
    export let lazyMultiInject: LazyMultiInject;
}
