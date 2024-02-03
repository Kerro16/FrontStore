import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/product/getall';
  

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any>{
    const options = {
      withCredentials: true 
    };
    return this.http.get<any>(`${this.apiUrl}`, options);
  }
}
