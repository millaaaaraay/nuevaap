import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AutService {
  constructor(
    public authenticationService:AuthService,
    public router:Router
  ) { }
  canActivate(): boolean {
    return this.authenticationService.isAuthenticated();
  }
}
