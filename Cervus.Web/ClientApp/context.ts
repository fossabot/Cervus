import { interfaces } from "inversify";

export module Context {
    type LazyInject = (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>) => (proto: any, key: string) => void;
    type LazyInjectNamed = (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>, named: string) => (proto: any, key: string) => void;
    type LazyInjectTagged = (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>, key: string, value: any) => (proto: any, propertyName: string) => void;
    type LazyMultiInject = (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>) => (proto: any, key: string) => void;
    type LazyDecorators = {
        lazyInject: LazyInject;
        lazyInjectNamed: LazyInjectNamed;
        lazyInjectTagged: LazyInjectTagged;
        lazyMultiInject: LazyMultiInject;
    };

    /**
     * Binds a set of decorators to a global context. This is not meant to be called
     * more than once per application lifetime.
     * @param decorators the decorators to bind to.
     */
    export function setDecorators(decorators: LazyDecorators) : void {
        lazyInjectAux = decorators.lazyInject;
    }

    var lazyInjectAux: LazyInject = id => (a, b) => { };
    var lazyInjectNamedAux: LazyInjectNamed = id => (a, b) => { };
    var lazyInjectTaggedAux: LazyInjectTagged = id => (a, b) => { };
    var lazyMultiInjectAux: LazyMultiInject = id => (a, b) => { };

    /**
     * Exports a lazy inject function which allows for properties to be injected in
     * a DI fashion.
     * @param id the element id to read from.
     */
    export const lazyInject: LazyInject = id => lazyInjectAux(id);
    export const lazyInjectNamed: LazyInjectNamed = id => lazyInjectAux(id);
    export const lazyInjectTagged: LazyInjectTagged = id => lazyInjectAux(id);
    export const lazyMultiInject: LazyMultiInject = id => lazyInjectAux(id);
}