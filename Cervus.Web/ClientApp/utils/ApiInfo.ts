import { injectable } from "inversify";

/**
 * Represents an ApiInfo object for a specific api.
 */
@injectable()
export class ApiInfo
{
    private readonly apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    getApiUrl() {
        return this.apiUrl;
    }
}
