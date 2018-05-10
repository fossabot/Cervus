import { Container } from "inversify";
import { ReactNode } from "react";

import { StoreFront } from "../components/StoreFront";
import { BaseRouteBinder } from "../routing/BaseRouteBinder";
import { ContainerModule, Dictionary, DocumentUtils, ReactEntryPointClass, RouteBinder, RouteSolver } from "../types";
import { ApiInfo } from "../utils/ApiInfo";
import { AppStoreRoutingConfig } from "../utils/appStoreRoutingConfig";
import { BaseDocumentUtils } from "../utils/BaseDocumentUtils";
import * as BindingConstants from "./bindingConstants";

export class StoreFrontModule implements ContainerModule {

    public load(container: Container) {
        container
            .bind<ReactEntryPointClass>("main")
            .toConstantValue(StoreFront);

        container
            .bind<DocumentUtils>(BindingConstants.DocumentUtilsId)
            .toConstantValue(new BaseDocumentUtils(document));

        const apiInfo = new ApiInfo(container
            .get<DocumentUtils>(BindingConstants.DocumentUtilsId)
            .getAttributeString("api-url"));

        container
            .bind<ApiInfo>(BindingConstants.ApiInfoId)
            .toConstantValue(apiInfo);

        container
            .bind<RouteBinder>(BindingConstants.RouteBinderId)
            .toConstantValue(new BaseRouteBinder());

        AppStoreRoutingConfig.bindRoutes(
            container.get<RouteBinder>(BindingConstants.RouteBinderId),
            container.get<DocumentUtils>(BindingConstants.DocumentUtilsId)
                .getAttribute<Dictionary<string>>("uris"));

        container
            .bind<RouteSolver>(BindingConstants.RouteSolverId)
            .toDynamicValue(interfaces => interfaces
                .container
                .get<RouteBinder>(BindingConstants.RouteBinderId)
                .build());

        return container;
    }
}
