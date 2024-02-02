import { Component } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn$: boolean = false;

  constructor() {
  
  }

  //Agregar logica despues
  logout(): void {
    //this.authService.logout();
  }

}
