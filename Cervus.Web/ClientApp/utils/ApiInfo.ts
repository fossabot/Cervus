import { injectable } from "inversify";

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
