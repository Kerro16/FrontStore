import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationAPIService } from './registration.api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})

export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb:FormBuilder, private registrationApiService: RegistrationAPIService){
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
