import * as BindingConstants from "./BindingConstants";
import { ApiInfo } from "./ApiInfo";
import { AppStoreRoutingConfig } from "./appStoreRoutingConfig";
import { BaseDocumentUtils } from "./BaseDocumentUtils";
import { BaseRouteBinder } from "../routing/BaseRouteBinder";
import { Container } from "inversify";
import { ContainerModule, Dictionary, DocumentUtils, RouteBinder, RouteSolver } from "../types";
import { ReactNode } from "react";

export class StoreFrontModule implements ContainerModule {

    load(container: Container) {
        container
            .bind<DocumentUtils>(BindingConstants.DocumentUtilsId)
            .toConstantValue(new BaseDocumentUtils(document));

        const apiInfo = new ApiInfo(container
            .get<DocumentUtils>(BindingConstants.DocumentUtilsId)
            .getAttributeString("apiUrl"));

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
