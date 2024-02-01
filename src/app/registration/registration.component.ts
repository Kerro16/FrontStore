import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationAPIService } from './registration.api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb:FormBuilder, private registrationApiService: RegistrationAPIService, private router: Router){
    this.registrationForm = this.fb.group({
      //Campos y validaciones
      username: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(){
    if (this.registrationForm.valid) {
      this.registrationApiService.registration(this.registrationForm).subscribe(
        (response) => {
        if(response){
          console.log('Registro exitoso');
          this.router.navigate(['/', 'login']);
        }
        else{
          console.log('Error de registro');
        }
      },
      (error) => {
        console.error('Error en la solicitud de registro', error);
      }
      );
    }
  }
}
