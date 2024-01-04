import { Injectable } from '@angular/core';
import { CanActivate, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) { 
      return true; 
    } else {
      this.router.navigate(['/login']); // Redirect to login 
      return false; 
    }
  }
}
