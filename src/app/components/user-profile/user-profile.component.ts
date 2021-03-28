import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormService} from '../../services/api/form.service';
import {concat, Subscription} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  @Input() customBgColor: string;

  public isLoading = true;
  public isError = false;
  public changeColor = false;

  private url1 = 'https://postman-echo.com/get?foo=bar1';
  private url2 = 'https://postman-echo.com/get?foo=bar2';
  private url3 = 'https://postman-echo.com/get?foo=bar3';
  private allSubscriptions$;
  private subscription: Subscription;

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.allSubscriptions$ = concat(
        this.formService.get(this.url1),
        this.formService.get(this.url2),
        this.formService.get(this.url3)
    );

    // If I want to handle requests without order I should use zip function

    this.subscription = this.allSubscriptions$.subscribe(_ => {
      this.isLoading = false;
      this.isError = false;
    }, _ => {
      this.isLoading = false;
      this.isError = true;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public changeBackground(color: boolean): void {
    this.changeColor = color;
  }

}
