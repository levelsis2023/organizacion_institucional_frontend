import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstitutionsService } from 'src/app/core/services/institutions.service';
import { CreateComponent } from '../modals/create/create.component';
import { UpdateComponent } from '../modals/update/update.component';
import { DeleteComponent } from '../modals/delete/delete.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  loading:boolean=true;
  institutions: any=[];
  data:any;
  column = 'id';
  direction = 'asc';
  totalPages: number=0;
  currentPage: number=0;

  constructor(
    private institutionsService: InstitutionsService,
    private modalService: NgbModal
  ) { 
      this.index();
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

  index(): void {
    this.loading=true;
    this.institutionsService.index(
      '',
      this.column,
      this.direction,
      this.currentPage,
      10,
      '',
      ''
    ).subscribe({
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
    this.index();
  }

  openModalCreate(){
   const modalRef= this.modalService.open(CreateComponent, { size: 'lg',backdrop:false });
   modalRef.componentInstance.name = 'World';

   modalRef.componentInstance.onCreate.subscribe((res:any) => {
    console.log(res);
    this.index();
   });
  }

  openModalUpdate(id:number){
    const modalRef= this.modalService.open(UpdateComponent, { size: 'lg',backdrop:false });
    modalRef.componentInstance.id = id;
 
    modalRef.componentInstance.onUpdate.subscribe((res:any) => {
     console.log(res);
     this.index();
    });
   }

   openModalDelete(id:number){
    const modalRef= this.modalService.open(DeleteComponent, { size: 'lg',backdrop:false });
    modalRef.componentInstance.id = id;

    modalRef.componentInstance.onDelete.subscribe((res:any) => {
     this.index();
    });
   }
}
