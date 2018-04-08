import { injectable } from "inversify";
import { RouteComponentProps } from "react-router";
import { Dictionary, KeyValuePair, Named, ReactComponentClass, RouteSolver } from "../types";

/**
 * A RouteSolver implementation that depends on a concrete
 * dictionary of KeyValuePair<ReactComponentClass, string>
 * to get all the bound routes.
 */
@injectable()
export class BaseRouteSolver implements RouteSolver {
    private mappedTypes: Dictionary<KeyValuePair<ReactComponentClass, string>>;

    /**
     * Creates an instance of a BaseRouteSolver from a dictionary.
     * @param {Dictionary<KeyValuePair<ReactComponentClass, string>>} mappedTypes
     * A dictionary containing all the ReactComponents and their respective actions.
     */
    constructor(mappedTypes: Dictionary<KeyValuePair<ReactComponentClass, string>>) {
        this.mappedTypes = mappedTypes;
    }

    public action(type: ReactComponentClass): string {
        if (!type) {
            throw new Error("Type is invalid!");
        }

        const typeAsAny = type as any;
        const typeAsNamed = typeAsAny as Named;
        const typeName = typeAsNamed.name;
        if (!typeName) {
            throw new Error("Type is invalid!");
        }

        return this.mappedTypes[typeName].value;
    }
}
