import { Injectable} from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { FormGroup } from "@angular/forms";
import { ApiConfigService } from "../api-config.service";

@Injectable({
  providedIn: 'root'
})

export class APILoginService {
  constructor(private http: HttpClient, private apiConfigService: ApiConfigService) {}

  login(form : FormGroup): Observable<any> {

    const {username, password} = form.value;

    const body = {username, password};

    

    const apiUrl = this.apiConfigService.getApiUrl('auth/signin');

    console.log(body);

    return this.http.post(apiUrl, body, {observe: 'response'}).pipe(
      tap((response: HttpResponse<any>) => {
        if(response.status === 200){
          console.log("Exito");
        }

        
      }),

      catchError((error) => {
        console.error('Fallo la autenticacion', error);
        return of(null);
      }),
      map(response => response ? response.body : null)

    );
  }



}

