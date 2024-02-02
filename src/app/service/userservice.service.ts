import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError,tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    const requestOptions = {
      withCredentials: true, // Incluye las credenciales en la solicitud
    };
    return this.http.get<any[]>(`${this.baseUrl}/api/users/getall`, requestOptions );
  }
}
