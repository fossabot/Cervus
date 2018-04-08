import { injectable } from "inversify";

/**
 * Represents an ApiInfo object for a specific api.
 * Wraps an apiUrl into an injectable immutable object.
 */
@injectable()
export class ApiInfo {
    private readonly apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    /**
     * Gets the API Url as configured.
     * @returns The API url.
     */
    public getApiUrl() {
        return this.apiUrl;
    }
}
