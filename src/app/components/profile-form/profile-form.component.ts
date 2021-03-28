import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../../services/api/form.service';
import {Subscription} from "rxjs";
import {Profile} from "../../interfaces/profile";

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit, OnDestroy {

  @Output() colorEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public form: FormGroup;
  public isSuccess = false;
  public isError = false;
  public isDisabled = false;

  private subscription: Subscription;

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.pattern('[- +()0-9]+'), Validators.maxLength(16)])
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public resetForm(): void {
    this.form.reset();
    this.isSuccess = false;
    this.isError = false;
    this.colorEmitter.emit(false);
    this.formService.resetCurrentProfile();
  }

  public submit(): void {
    if (this.form.valid) {
     this.subscription = this.formService.submit(this.name.value, this.email.value, this.phoneNumber.value).subscribe(_ => {
        this.isSuccess = true;
        this.isError = false;
        this.isDisabled = true;
        this.formService.changeCurrentProfile(this.createCurrentProfile());
        this.colorEmitter.emit(true);
        this.disableButton();
      }, _ => {
        this.isError = true;
        this.isSuccess = false;
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  private createCurrentProfile(): Profile {
    return {
      name: this.name.value,
      email: this.email.value,
      phoneNumber: this.phoneNumber.value
    };
  }

  private disableButton(): void {
    setTimeout(() => {
        this.isDisabled = false;
        this.isSuccess = false;
      },
      5000);
  }

  get name(): AbstractControl { return this.form.get('name'); }
  get email(): AbstractControl { return this.form.get('email'); }
  get phoneNumber(): AbstractControl { return this.form.get('phoneNumber'); }
}
