import * as BindingConstants from "./BindingConstants";
import { BaseDocumentUtils } from "./BaseDocumentUtils";
import { BaseRouteBinder } from "../routing/BaseRouteBinder";
import { Container } from "inversify";
import { RouteBinder, Dictionary, DocumentUtils, RouteSolver, LazyInjector, ContainerModule } from "../types";
import { ApiInfo } from "./ApiInfo";
import { ReactNode } from "react";
import { AppStoreRoutingConfig } from "./appStoreRoutingConfig";

export class StoreFrontModule implements ContainerModule {

    load(container: Container) {
        container
            .bind<DocumentUtils>(BindingConstants.DocumentUtilsId)
            .toConstantValue(new BaseDocumentUtils(document));

        const apiInfo = new ApiInfo(container
            .get<DocumentUtils>(BindingConstants.DocumentUtilsId)
            .getAttributeString("apiUrl"))

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