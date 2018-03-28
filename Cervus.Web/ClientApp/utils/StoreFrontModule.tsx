import * as BindingConstants from "./BindingConstants";
import { BaseDocumentUtils } from "../utils/BaseDocumentUtils";
import { BaseRouteBinder } from "../routing/BaseRouteBinder";
import { Container } from "inversify";
import { RouteBinder, Dictionary, DocumentUtils, RouteSolver, LazyInjector } from "../types";
import { ApiInfo } from "../utils/ApiInfo";

export class StoreFrontModule {

    load(storeFrontContainer: Container) {
        // This value should somehow be injected into the application
        // from the view itself.
        storeFrontContainer
            .bind<DocumentUtils>(BindingConstants.DocumentUtilsId)
            .toConstantValue(new BaseDocumentUtils(document));
        
        storeFrontContainer
            .bind<ApiInfo>(BindingConstants.ApiInfoId)
            .toConstantValue(new ApiInfo(storeFrontContainer
                .get<DocumentUtils>(BindingConstants.DocumentUtilsId)
                .getAttributeString("apiUrl")));

        storeFrontContainer
            .bind<RouteBinder>(BindingConstants.RouteBinderId)
            .toConstantValue(new BaseRouteBinder());

        storeFrontContainer
            .bind<RouteSolver>(BindingConstants.RouteSolverId)
            .toDynamicValue(interfaces => interfaces
                .container
                .get<RouteBinder>(BindingConstants.RouteBinderId)
                .build());

        return storeFrontContainer;
    }
}