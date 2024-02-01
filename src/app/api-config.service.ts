import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ApiConfigService {
    private baseUrl = 'http://localhost:8080';

    getApiUrl(endpoint: string): string {
        return `${this.baseUrl}/api/${endpoint}`;
    }
}