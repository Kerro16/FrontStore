import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private baseUrl = 'http://localhost:8080'; 

    constructor(private http: HttpClient){}

    login(userapi: string, passwordapi: string, form:FormGroup): Observable<any>{
        const credentials = btoa(`${userapi}:${passwordapi}`);
        const headers = new HttpHeaders ({Authorization: `Basic ${credentials}`});
        const {username, password, email} = form.value;
        const body = [{ username, password, email }];
        return this.http.post(`${this.baseUrl}/api/v1/user/add`, body, { headers, observe: 'response' }).pipe(
            tap((response: HttpResponse<any>) => {
                // Verifica el código de estado HTTP
                if(response.status === 200){
                    // Almacena el token si la respuesta es exitosa
                    localStorage.setItem('token', credentials);
                }
            }),
            catchError((error) => {
                console.error('Falló la autenticación', error);
                return of(null);
            }),
            map(response => response ? response.body: null) 
        );
    }
    
}