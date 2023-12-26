import { Component, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { InstitutionsService } from 'src/app/core/services/institutions.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  @Input() parentId: any='';
  isLoading = false;
  form: FormGroup;
  submitted = false;
  disableSubmitButton = false;

  // Arrays for selects
  countries_items: any[] = [];
  error:any;
  onCreate: EventEmitter<any> = new EventEmitter<any>();

  constructor(private institutionsService: InstitutionsService, public modal: NgbActiveModal, private fb: FormBuilder) { 
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
      parent_id: [this.parentId],
    });
  }



  submit() {
    this.error = null;
    this.submitted = true;
    this.disableSubmitButton = true;
    // Stop here if form is invalid.
    if (this.form.invalid) {
      this.error = 'Por favor complete los campos requeridos.';
      this.disableSubmitButton = false;
      return;
    }
    this.store(this.form.value);
  }



  store(form: any) { 
    this.institutionsService.store(form).subscribe({
      next: (res:any) => {
        this.onCreate.emit(res);
        this.modal.close();
      },
      error: (err:any) => {
        this.error = JSON.stringify(err.error);
        console.log(err);
        this.disableSubmitButton = false;
      }
    });
  }
}
