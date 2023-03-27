import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { CITIES } from 'src/shared/constant';

@Component({
  selector: 'app-share-form-view',
  templateUrl: './share-form-view.component.html',
  styleUrls: ['./share-form-view.component.css'],
})
export class ShareFormViewComponent implements OnInit {
  public readonly listOfCities = CITIES;
  public loading: boolean = false;

  public form!: FormGroup;

  constructor() {
    this.initForm();
  }

  ngOnInit(): void {}

  public onSubmit(formRef: FormGroupDirective): void {
    if (this.form.valid) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        formRef.resetForm();
      }, 1000);
    }
  }

  public reset(): void {
    this.form.reset();
  }

  private initForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      role: new FormControl('', [Validators.required]),
      city: new FormControl(''),
      address: new FormControl(''),
    });
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get role(): FormControl {
    return this.form.get('role') as FormControl;
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
}
