import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
