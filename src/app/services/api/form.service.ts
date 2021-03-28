import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Profile} from '../../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private baseURL = 'https://postman-echo.com/post';
  private profileSubject: BehaviorSubject<Profile>;
  public profile$: Observable<Profile>;

  constructor(
    private http: HttpClient
  ) {
    this.profileSubject = new BehaviorSubject<Profile>(null);
    this.profile$ = this.profileSubject.asObservable();
  }

  public getCurrentProfile(): Profile {
    return this.profileSubject.value;
  }

  public resetCurrentProfile(): void {
    this.profileSubject.next(null);
  }

  public changeCurrentProfile(profile: Profile): void {
    this.profileSubject.next(profile);
  }

  submit(name: string, email: string, phone?: string): Observable<any> {
    return this.http.post(this.baseURL, {name, email, phone});
  }

  get(url: string): Observable<any> {
    return this.http.get(url);
  }
}
