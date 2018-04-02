import * as React from "react";
import * as ReactDOM from "react-dom";
import getDecorators from "inversify-inject-decorators";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import { Container, interfaces } from "inversify";
import { Context } from "./context";
import { ReactNode, DOMAttributes } from "react";
import { ReactEntryPointClass, ContainerModule } from "./types";

/**
 * A generic module that starts an app in three phases:
 * - A setup (constructor.)
 * - runModules - Allows for ContainerModules to be run at any time.
 * - start - starts the react app properly.
 */
export class AppContext {
    private readonly container: Container;

    /**
     * Creates the IoC container and binds the static lazyDecorators for
     * property dependency injection.
     */
    constructor() {
        // Create the IoC - DI container.
        this.container = new Container();
        Context.setDecorators(getDecorators(this.container, false));
    }

    /**
     * Builds a container from the loaded modules.
     * @param container The IoC container that will be used to resolve
     * dependencies.
     */
    public runModules(...containerModules: ContainerModule[]): AppContext {
        for (const currentModule of containerModules) {
            currentModule.load(this.container);
        }

        return this;
    }

    /**
     * Generic application entry point that will load the react App as
     * configured from the container.
     * @param entryPoint The application react component that defines the
     * entry point.
     */
    public start(entryPoint: ReactEntryPointClass): void {
        // This code starts up the React app when it runs in a browser. It sets up the routing
        // configuration and injects the app into a DOM element.
        const entryPointNode = React.createElement(entryPoint);
        const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href")!;

        ReactDOM.render(
            <AppContainer>
                <BrowserRouter children={entryPointNode} basename={baseUrl} />
            </AppContainer>,
            document.getElementById("react-app"));
    }
}
