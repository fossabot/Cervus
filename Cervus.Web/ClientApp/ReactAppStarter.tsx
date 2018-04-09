import { Container, interfaces } from "inversify";
import getDecorators from "inversify-inject-decorators";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import { Lazy } from "./ioc/Lazy";
import { ContainerModule, Dictionary, ReactEntryPointClass } from "./types";

/**
 * A generic React Application starter module that depends on an IoC container to initialize
 * a React app with the "start" method. This class relies heavily on strings as to avoid
 * having a lazy dependencies between the imported modules. The concept is that only when the
 * start operation is called, will the application start properly.
 */
export class ReactAppStarter {
    private appComponentId: string;
    private readonly moduleLocation: string;
    private readonly moduleName: string;

    /**
     * Creates an instance of a ReactAppStarter which can start the react application. This
     * process can be initialized by calling the "start" method.
     * @param {string} appComponentId The html id that refers to the element that will
     * render the react-app.
     * @param {string} moduleLocation The location to the module that will contain the
     * default app configurations.
     * @param {string} moduleName The module's specific name that will be the class to
     * initialize the IoC. Remarks: This module must have a component bound to the keyword
     * "name" of the type {ReactEntryPointClass} as this will be the application's entry point.
     */
    constructor(appComponentId: string, moduleLocation: string, moduleName: string) {
        this.appComponentId = appComponentId;
        this.moduleLocation = moduleLocation;
        this.moduleName = moduleName;
    }

    /**
     * Generic application entry point that will load the react App by configuring it
     * from the IoC container and loading the IoC module. The application will then only
     * start once the module is loaded.
     */
    public start(): void {
        const baseUrl = document
            .getElementsByTagName("base")[0]
            .getAttribute("href")!;

        // Create the IoC - DI container.
        const container = new Container();
        Lazy.setDecorators(getDecorators(container, false));

        // Get the main module, this operation may take a while.
        this.getMainModule(this.moduleLocation, this.moduleName).then(module => {
            // Procede to load the module to build all the necessary IoC
            // configurations.
            module.load(container);

            // This code starts up the React app when it runs in a
            // browser. It sets up the routing configuration and injects
            // the app into a DOM element.
            const entryPoint = container.get<ReactEntryPointClass>("main");
            const entryPointNode = React.createElement(entryPoint);

            ReactDOM.render(
                <AppContainer>
                    <BrowserRouter children={entryPointNode} basename={baseUrl} />
                </AppContainer>,
                document.getElementById(this.appComponentId));
        });
    }

    /**
     * Loads the main app's module from its name.
     */
    private async getMainModule(moduleLocation: string, moduleName: string): Promise<ContainerModule> {
        // This is to avoid a warning, because without the quotations, the
        // import will be called as an expression, causing an exception.
        const mainModuleNamespace = await import("" + moduleLocation);
        const mainContainerModule = mainModuleNamespace[moduleName];

        return new mainContainerModule() as ContainerModule;
    }
}
