import { Component, EventEmitter, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AreaService } from 'src/app/core/services/area.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  @Input() id: any='';
  submitted = false;
  disableSubmitButton = false;


  error:any;
  onDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor(private areaService: AreaService, public modal: NgbActiveModal, private fb: FormBuilder) { 
  }

  submit() {
    this.error = null;
    this.submitted = true;
    this.disableSubmitButton = true;
    // Stop here if form is invalid.
    if (!this.id) {
      this.error = 'A ocurrido un error, por favor intenta de nuevo.';
      this.disableSubmitButton = false;
      return;
    }
    this.areaService.destroy(this.id).subscribe({
      next: (res:any) => {
        this.onDelete.emit(res);
        this.modal.close('Ok');
      },
      error: (err:any) => {
        this.error = err;
        this.disableSubmitButton = false;
      }
    });
  }
}
