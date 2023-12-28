import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AreaService } from 'src/app/core/services/area.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit{
  @Input() id: any='';
  name: string='';
  isLoading = false;
  form: FormGroup;
  submitted = false;
  disableSubmitButton = false;


  error:any;
  onUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor(private areaService: AreaService, public modal: NgbActiveModal, private fb: FormBuilder) { 

    this.createForm();

  }







  ngOnInit() {
    // do nothing
    this.show(this.id);
  }

  /**
   * The basic configuration for the form work properly.
   * Add validations or html rule here.
   */
  createForm() {
    this.form = this.fb.group({
      id: [this.id],
      code: ['', Validators.required],
      name: ['', Validators.required],
      short_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      born_code: ['', Validators.required],
      parent_id: [''],
      institution_id: [''],
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
    this.update(this.form.value);
  }




  update(form: any) { 
    this.areaService.update(this.form.value.id,form).subscribe({
      next: (res:any) => {
        this.onUpdate.emit(res);
        this.modal.close();
      },
      error: (err:any) => {
        this.error = JSON.stringify(err.error);
        console.log(err);
        this.disableSubmitButton = false;
      }
    });
  }

  show(id: number) {
    this.isLoading = true;
    this.areaService.show(id).subscribe({
      next: (res:any) => {
        this.form.patchValue({
          id: res.area.id,
          code: res.area.code,
          name: res.area.name,
          short_name: res.area.short_name,
          phone: res.area.phone,
          email: res.area.email,
          born_code: res.area.born_code,
          institution_id: res.area.institution_id
        })

        this.isLoading = false;
      },
      error: (err:any) => {
        this.isLoading = false;
      }
    });
  }
}
