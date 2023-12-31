import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AreaService } from 'src/app/core/services/area.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent  implements OnInit{
  @Input() institutionId: any='';
  isLoading = false;
  form: FormGroup;
  submitted = false;
  disableSubmitButton = false;

  // Arrays for selects
  countries_items: any[] = [];
  error:any;
  onCreate: EventEmitter<any> = new EventEmitter<any>();

  constructor(private areaService: AreaService, public modal: NgbActiveModal, private fb: FormBuilder) { 
    this.createForm();
  }



  ngOnInit() {
    // do nothing
    this.form.get('institution_id')?.setValue(this.institutionId);
  }

  /**
   * The basic configuration for the form work properly.
   * Add validations or html rule here.
   */
  createForm() {
    this.form = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      short_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      born_code: ['', Validators.required],
      institution_id: ['',Validators.required],
    });
  }



  submit() {
    this.error = null;
    this.submitted = true;
    this.disableSubmitButton = true;
    // Stop here if form is invalid.
    if (this.form.invalid) {
      console.log(this.form.value);
      this.error = 'Por favor complete los campos requeridos.';
      this.disableSubmitButton = false;
      return;
    }
    this.store(this.form.value);
  }



  store(form: any) { 
    this.areaService.store(form).subscribe({
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
