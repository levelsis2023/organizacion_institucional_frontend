import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  form: FormGroup;
  submitted = false;
  disableSubmitButton = false;

  // Arrays for selects
  countries_items: any[] = [];

  id: number;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {

    this.createForm();

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.show(this.id);
    });
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
      password: '',
      password_confirmation: '',
      phone: '',
      address: ''
    },{
      validator: this.passwordMatchValidation('password', 'password_confirmation')
    }
    );
  }

  passwordMatchValidation(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // VALIDATE IF THE CONTROLS ARE NOT NULL

      if (!control || !matchingControl) {
        return;
      }

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
    this.update(this.form.value);
  }



  update(form: any) {
  }


  show(id: number) {
    this.userService.show(id).subscribe({
      next: (response: any) => {
        console.log(response);
        //this.form.patchValue(response.data);
        this.form.patchValue({
          name: response.data.nombres,
          last_name: response.data.apellidos,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address
        })
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
