import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginSubject: BehaviorSubject<boolean>;
  public login$: Observable<boolean>;

  constructor(
    private router: Router
  ) {
    this.loginSubject = new BehaviorSubject<boolean>(null);
    this.login$ = this.loginSubject.asObservable();
  }

  public login(username: string, password: string): void {
    // There will be communication with our API
    localStorage.setItem('isLoggedIn', 'true');
    this.loginSubject.next(true);
    this.router.navigate(['']);
  }

  public refreshLogin(): void {
    this.loginSubject.next(true);
    this.router.navigate(['']);
  }

  public logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.loginSubject.next(false);
    this.router.navigate(['/login']);
  }
}
