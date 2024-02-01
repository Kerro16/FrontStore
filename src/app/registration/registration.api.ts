import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { FormGroup } from "@angular/forms";
import { ApiConfigService } from "../api-config.service";

@Injectable({
    providedIn: 'root'
})

export class RegistrationAPIService {

    constructor(private http: HttpClient, private apiConfigService: ApiConfigService) {}

    registration(form: FormGroup): Observable<any> {
        const { username, password, email } = form.value;
        const body = {username, password, email};

        const apiUrl = this.apiConfigService.getApiUrl('auth/signup');
        console.log(apiUrl);

        return this.http.post(apiUrl, body, {observe: 'response'}).pipe(
            tap((response: HttpResponse<any>) => {
                if(response.status ===200) {
                    console.log('Registro exitoso');
                }

            }),
            catchError((error) =>{
                console.error('Fallo el registro', error);
                return of (null);

            }),
            map(response => response ? response.body : null)
        )
    }
    
    
}