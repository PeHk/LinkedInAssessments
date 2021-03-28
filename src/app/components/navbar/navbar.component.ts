import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.login$.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  public logout(): void {
    this.loginService.logout();
  }

}
