import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})

export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb:FormBuilder, private authService: AuthService){
    this.registrationForm = this.fb.group({
      //Campos y validaciones
      username: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(){
    if (this.registrationForm.valid){
      this.authService.login('admin', 'adminpassword',this.registrationForm).subscribe((response) => {
        if(response){
          console.log('Exito');
        }
        else{
          console.log('Error de autenticacion');
        }
      });
    }
  }

}
