import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Verifica si el usuario está autenticado
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      // Si no está autenticado, redirige a la página de login
      this.router.navigate(['login']);
      return false;
    }

    // Si está autenticado, permite el acceso a la ruta
    return true;
  }
}
