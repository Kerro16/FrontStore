import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { FormGroup } from "@angular/forms";
import { AuthService } from "../service/auth.service";

@Injectable({
    providedIn: 'root'
})

export class RegistrationAPIService {

    constructor(private http: HttpClient, private authService:AuthService) {}

    registration(form: FormGroup): Observable<any> {
        const { username, password, email } = form.value;
        const body = {username, password, email};

      return this.authService.register(body);
       
    }
    
}