import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstitutionsService } from 'src/app/core/services/institutions.service';
import { CreateComponent } from '../modals/create/create.component';
import { UpdateComponent } from '../modals/update/update.component';
import { DeleteComponent } from '../modals/delete/delete.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subinstitutions',
  templateUrl: './subinstitutions.component.html',
  styleUrls: ['./subinstitutions.component.scss']
})
export class SubinstitutionsComponent {
  loading:boolean=true;
  institutions: any=[];
  data:any;
  column = 'id';
  direction = 'asc';
  totalPages: number=0;
  currentPage: number=0;
  id: any;

  constructor(
    private institutionsService: InstitutionsService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute
  ) { 
      this.getSubInstitutions();
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];
        this.getSubInstitutions();
      });
  }

  ngOnInit(): void {
  }

  pageChange(event: any): void {
    console.log(event);
  }

  sort(event: any): void {
    this.column=event;
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
  }

  getSubInstitutions(): void {
    this.loading=true;
    this.institutionsService.subinstitutions(this.id).subscribe({
      next: (res:any) => {
        console.log(res);
        this.institutions=res.institutions;
        // this.totalPages=res.data.pagination.last_page;
        // this.currentPage=res.data.pagination.current_page;
        this.loading=false;
      },
      error: (err:any) => {
        this.loading=false;
      }
    });
  
  }


  reset(){
    this.currentPage=1;
    this.column='id';
    this.direction='desc';
    this.getSubInstitutions();
  }

  openModalCreate(){
   const modalRef= this.modalService.open(CreateComponent, { size: 'lg',backdrop:false });
   modalRef.componentInstance.name = 'World';

   modalRef.componentInstance.onCreate.subscribe((res:any) => {
    console.log(res);
    this.getSubInstitutions();
   });
  }

  openModalUpdate(id:number){
    const modalRef= this.modalService.open(UpdateComponent, { size: 'lg',backdrop:false });
    modalRef.componentInstance.id = id;
 
    modalRef.componentInstance.onUpdate.subscribe((res:any) => {
     console.log(res);
     this.getSubInstitutions();
    });
   }

   openModalDelete(id:number){
    const modalRef= this.modalService.open(DeleteComponent, { size: 'lg',backdrop:false });
    modalRef.componentInstance.id = id;

    modalRef.componentInstance.onDelete.subscribe((res:any) => {
     this.getSubInstitutions();
    });
   }
}
