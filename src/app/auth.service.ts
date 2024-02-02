import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError,tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080'; //API URL
  private authTokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  authenticate(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/signin`, credentials, { observe: 'response', withCredentials: true})
      .pipe(
        tap((response: any) => {
          // Extraer y guardar la cookie en el almacenamiento local
          const cookie = response.headers.get('Set-Cookie');
          if (cookie) {
            localStorage.setItem('auth_cookie', cookie);
          }
        }),
        catchError((error) => {
          console.error('Fallo el registro', error);
          // Retorna un observable con el error para que pueda ser manejado por el flujo de observables
          return throwError(() => error);
          
        })
      );
  }

  getAllUsers(): Observable<any[]> {
    const requestOptions = {
      withCredentials: true, // Incluye las credenciales en la solicitud
    };
    return this.http.get<any[]>(`${this.baseUrl}/api/users/getall`, requestOptions );
  }

 
}
