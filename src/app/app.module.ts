import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './views/main/main.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SubmittedDataComponent } from './components/submitted-data/submitted-data.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import {HttpClientModule} from '@angular/common/http';
import {appInitializer} from './services/app.initializer';
import {Router} from '@angular/router';
import {LoginService} from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MainComponent,
    UserProfileComponent,
    SubmittedDataComponent,
    ProfileFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HttpClientModule,
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [LoginService, Router] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
