import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const userData = localStorage.getItem('user');

    if (!userData) {
      // No user → not logged in
      this.router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(userData);
    const allowedRoles: string[] = route.data['roles'];

    // If no roles specified → allow
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    // Check role match
    if (allowedRoles.includes(user.role)) {
      return true;
    }

    // Role not authorized
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
