import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  private apiUrl = 'http://localhost:8080/api/product';
  

  constructor(private http: HttpClient) { }

  getProductDetails(productId: number): Observable <any>{
    const url = `${this.apiUrl}/get?id=${productId}`;
    const options = { withCredentials: true };

   return this.http.get<any>(url, options);
  }
}
