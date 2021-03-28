import {Router} from '@angular/router';
import {LoginService} from './login.service';

export function appInitializer(loginService: LoginService, router: Router): any {
  const loggedIn = localStorage.getItem('isLoggedIn');

  if (loggedIn != null && loggedIn === 'true') {
    return () => loginService.refreshLogin();
  } else {
    return () => Promise.resolve();
  }
}
