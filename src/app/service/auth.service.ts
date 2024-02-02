import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject} from 'rxjs';
import {catchError,tap, map} from 'rxjs/operators';
import { UserModel } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080'; //API URL
  private userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null> (null);
  user$: Observable<UserModel | null> = this.userSubject.asObservable();
  

  constructor(private http: HttpClient) { }

  authenticate(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/signin`, credentials, { observe: 'response', withCredentials: true})
      .pipe(
        tap((response: any) => {
          const user = response.body as UserModel;
          if (user) {
            this.userSubject.next(user);
          }
        }),
        catchError((error) => {
          console.error('Fallo el registro', error);
    
          return throwError(() => error);
          
        })
      );
  }

 register(credentials: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/api/auth/signup`, credentials, { observe: 'response' }).pipe(
    tap((response: HttpResponse<any>) => {
      if (response.status === 200) {
        console.log('Registro exitoso');
      }
    }),
    catchError((error) => {
      console.error('Fallo el registro', error);

      // Check if the error is due to circular references
      if (error instanceof TypeError && error.message.includes('cyclic object value')) {
        console.error('Circular reference detected in the credentials object');
        // You might want to handle circular references here or log additional information
      }

      return of(null);
    }),
    map(response => response ? response.body : null)
  );


  }

  getUserRoles(): string[] {
    return this.userSubject.value ? this.userSubject.value.roles : [];
  }

  hasUserRole(role: string): boolean {
    return !!this.userSubject.value?.roles?.includes(role);
  }

  validateUser(): Observable<boolean> {
    const url = `${this.baseUrl}/api/auth/validateuser`;

    return this.http.get(url, {withCredentials:true}).pipe(
      map(() => true),  // Si la solicitud tiene éxito, retorna true
      catchError(() => of(false)) 
    );
  }
    
  signoutrequest(): Observable<any> {
    const url = `${this.baseUrl}/api/auth/signout`;
  
    // Agrega la opción withCredentials a nivel de la solicitud
    const requestOptions: Object = {
      withCredentials: true
    };
  
    // Realiza la solicitud POST y devuelve el Observable para manejar la respuesta
    return this.http.post(url, {}, requestOptions);
  }
 
}
