import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AuthstatusserviceService } from '../service/authstatusservice.service';
import { Localstorageservice } from '../service/local-storage.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;
  userRoles: string[] = [];
  


  constructor(private authStatusService: AuthstatusserviceService, private authService: AuthService, private localStorageService: Localstorageservice, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    const storedIsAuthenticated = this.localStorageService.getItem('isAuthenticated');

    this.isAuthenticated = storedIsAuthenticated !== null ? JSON.parse(storedIsAuthenticated) : false;

    this.authStatusService.isAuthenticated$.subscribe(isAuthenticated => {
      console.log('Navbar - isAuthenticated (subscription):', isAuthenticated);
      this.isAuthenticated = isAuthenticated;
      this.updateUserRoles();
      this.localStorageService.setItem('isAuthenticated', JSON.stringify(isAuthenticated));

        // Forzar la detección de cambios
    this.cdr.detectChanges();
    console.log('Navbar - Updated roles:', this.userRoles);
    });
  }



logout():void{
  this.authService.signoutrequest().subscribe(
    () => {
      // La lógica para manejar el éxito del cierre de sesión
      this.isAuthenticated = false;
      this.router.navigate(['/', 'login']);
    },
    (error) => {
      // La lógica para manejar cualquier error
      console.error('Error al cerrar sesión:', error);
    }
  );
  }
  private updateUserRoles(): void {
    this.userRoles = this.authService.getUserRoles();
    console.log('Navbar - updateUserRoles - userRoles:', this.userRoles);
  }

}
