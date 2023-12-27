import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AreaService } from 'src/app/core/services/area.service';
import { CreateComponent } from '../modals/create/create.component';
import { UpdateComponent } from '../modals/update/update.component';
import { DeleteComponent } from '../modals/delete/delete.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  loading: boolean = true;
  institutions: any = [];
  data: any;
  column = 'id';
  direction = 'asc';
  totalPages: number = 0;
  currentPage: number = 0;
  rowsPerPage: number = 0;
  institucionId: any = '';

  constructor(
    private areaService: AreaService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.institucionId = params['id'];
      this.index();
    });
  }

  ngOnInit(): void {
  }

  pageChange(event: any): void {
    console.log(event);
    this.currentPage = event;
    this.index();
  }

  sort(event: any): void {
    this.column = event;
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
  }

  index(): void {
    this.loading = true;
    this.areaService.index(
      '',
      this.column,
      this.direction,
      this.currentPage,
      10,
      '',
      this.institucionId
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.institutions = res.area.data;
        this.totalPages = res.area.last_page;
        this.currentPage = res.area.current_page;
        this.rowsPerPage = res.area.per_page;
        this.data = res.area;
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
      }
    });

  }


  reset() {
    this.currentPage = 1;
    this.column = 'id';
    this.direction = 'desc';
    this.index();
  }

  openModalCreate() {
    const modalRef = this.modalService.open(CreateComponent, { size: 'lg', backdrop: false });
    modalRef.componentInstance.name = 'World';

    modalRef.componentInstance.onCreate.subscribe((res: any) => {
      console.log(res);
      this.index();
    });
  }

  openModalUpdate(id: number) {
    const modalRef = this.modalService.open(UpdateComponent, { size: 'lg', backdrop: false });
    modalRef.componentInstance.id = id;

    modalRef.componentInstance.onUpdate.subscribe((res: any) => {
      console.log(res);
      this.index();
    });
  }

  openModalDelete(id: number) {
    const modalRef = this.modalService.open(DeleteComponent, { size: 'lg', backdrop: false });
    modalRef.componentInstance.id = id;

    modalRef.componentInstance.onDelete.subscribe((res: any) => {
      this.index();
    });
  }
}
