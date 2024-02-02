import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { FormGroup } from "@angular/forms";
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class APILoginService {
  

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(form: FormGroup): Observable<any> {
    const { username, password } = form.value;
    const body = { username, password };

    return this.authService.authenticate(body)
      .pipe(
        tap((response: any) => {
          console.log('Autenticación exitosa:', response);
        }),
        catchError((error) => {
          console.error('Error en la autenticación:', error);
          return throwError(() => error);
        })
      );
  }
}