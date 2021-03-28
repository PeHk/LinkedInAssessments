import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './views/login/login.component';
import {MainComponent} from './views/main/main.component';
import {LoginGuard} from './guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: MainComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
