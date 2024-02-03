import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs';
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
    timer(0, 1 * 60 * 1000)
      .pipe(
        switchMap(() => this.authService.validateUser())
      )
      .subscribe((isAuthenticated) => {
        this.isAuthenticatedSubject.next(isAuthenticated);
      });
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
