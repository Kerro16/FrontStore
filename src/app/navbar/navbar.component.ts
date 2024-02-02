import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AuthstatusserviceService } from '../service/authstatusservice.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;
  userRoles: string[] = [];
  


  constructor(private authStatusService: AuthstatusserviceService, private authService: AuthService) {}

 ngOnInit():void{

  this.authStatusService.isAuthenticated$.subscribe(isAuthenticated => {
    this.isAuthenticated = isAuthenticated;
    if (isAuthenticated) {
      this.userRoles = this.authService.getUserRoles();
    } else {
      this.userRoles = [];
    }
  });
}


logout():void{
  this.authService.signoutrequest().subscribe(
    () => {
      // La lógica para manejar el éxito del cierre de sesión
      this.isAuthenticated = false;
    },
    (error) => {
      // La lógica para manejar cualquier error
      console.error('Error al cerrar sesión:', error);
    }
  );
  }
}
