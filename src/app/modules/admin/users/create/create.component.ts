import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  // Set form
  form: FormGroup;
  submitted = false;
  disableSubmitButton = false;

  // Arrays for selects
  countries_items: any[] = [];

  constructor(
    private fb: FormBuilder
  ) {

    this.createForm();

  }

  ngOnInit() {
    // do nothing
  }

  /**
   * The basic configuration for the form work properly.
   * Add validations or html rule here.
   */
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      phone: [''],
      address: ['']
    },{
      validator: this.passwordMatchValidation('password', 'password_confirmation')
    }
    );
  }

  passwordMatchValidation(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors["mustMatch"]) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  submit() {
    this.submitted = true;
    this.disableSubmitButton = true;
    // Stop here if form is invalid.
    if (this.form.invalid) {
      this.disableSubmitButton = false;
      return;
    }
    this.store(this.form.value);
  }



  store(form: any) {

  }



}
