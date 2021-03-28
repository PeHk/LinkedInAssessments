import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormService} from '../../services/api/form.service';
import {Subscription} from 'rxjs';
import {Profile} from '../../interfaces/profile';

@Component({
  selector: 'app-submitted-data',
  templateUrl: './submitted-data.component.html',
  styleUrls: ['./submitted-data.component.scss']
})
export class SubmittedDataComponent implements OnInit, OnDestroy {

  public profile: Profile;
  private subscription: Subscription;

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.subscription = this.formService.profile$.subscribe(profile => {
      this.profile = profile;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
