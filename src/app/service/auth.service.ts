import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject} from 'rxjs';
import {catchError,tap, map, switchMap} from 'rxjs/operators';
import { UserModel } from '../user/user.model';
import { Localstorageservice } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080'; //API URL
  private userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null> (null);
  user$: Observable<UserModel | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private localStorageService:Localstorageservice) { }

  private authenticateUser(credentials: any): Observable<UserModel> {
    return this.http.post(`${this.baseUrl}/api/auth/signin`, credentials, { observe: 'response', withCredentials: true })
      .pipe(
        map((response: any) => response.body as UserModel)
      );
  }
  authenticate(credentials: any): Observable<any> {
    return this.authenticateUser(credentials).pipe(
      tap(user => {
      
        this.localStorageService.setItem('user', user);
        this.userSubject.next(user);
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
        return of(null);
      }),
      map(response => response ? response.body : null)
    );
  }

  getUserRoles(): string[] {
    const user = this.localStorageService.getItem('user');
    return user ? user.roles : [];
  }

  hasUserRole(role: string): boolean {
    return !!this.userSubject.value?.roles?.includes(role);
  }

  validateUser(): Observable<boolean> {
    const url = `${this.baseUrl}/api/auth/validateuser`; // Asegúrate de que este sea el endpoint correcto
  
    return this.http.get(url, { withCredentials: true }).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
    
  signoutrequest(): Observable<any> {
    const url = `${this.baseUrl}/api/auth/signout`;
    const requestOptions: Object = {
      withCredentials: true
    };

    return this.http.post(url, {}, requestOptions).pipe(
      tap(() => {
        this.userSubject.next(null);
        this.localStorageService.removeItem('user');
      })
    );
  }
}