import { injectable } from "inversify";
import { RouteComponentProps } from "react-router";
import { RouteSolver, ReactComponentClass, Dictionary, KeyValuePair, Named } from "../types";

@injectable()
export class BaseRouteSolver implements RouteSolver {
    private mappedTypes: Dictionary<KeyValuePair<ReactComponentClass, string>>;

    constructor(mappedTypes: Dictionary<KeyValuePair<ReactComponentClass, string>>) {
        this.mappedTypes = mappedTypes;
    }

    action(type: ReactComponentClass): string {
        if (!type) {
            throw new Error("Type is invalid!");
        }

        const typeAsNamed = <Named>(<any>type);
        const typeName = typeAsNamed.name;
        if (!typeName) {
            throw new Error("Type is invalid!");
        }
        
        return this.mappedTypes[typeName].value;
    }
}
