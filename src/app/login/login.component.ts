import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APILoginService } from './login.api';
import { AuthstatusserviceService } from '../service/authstatusservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private apiLoginService: APILoginService, private authStatusService: AuthstatusserviceService, private router: Router){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.apiLoginService.login(this.loginForm).subscribe(
        (response) => {
          console.log('Respuesta del servicio', response);
          this.authStatusService.validateAuthentication();
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Error en la solicitud de login', error);
        }
      );
    }
  }
}
