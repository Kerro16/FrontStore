import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthstatusserviceService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) { 
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    this.setupAuthenticationPolling();
  }

  private setupAuthenticationPolling(): void {
    // Realiza la validación periódica cada minuto
    setInterval(() => {
      this.authService.validateUser().subscribe((isAuthenticated) => {
        this.isAuthenticatedSubject.next(isAuthenticated);
      });
    }, 1 * 60 * 1000);
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  validateAuthentication(): void {
    this.authService.validateUser().subscribe((isAuthenticated) => {
      this.isAuthenticatedSubject.next(isAuthenticated);
    });
  }
}
