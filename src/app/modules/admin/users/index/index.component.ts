import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements  OnInit {
  loading:boolean=true;
  users: any=[];
  data:any;
  column = 'id';
  direction = 'asc';
  totalPages: number=0;
  currentPage: number=0;

  constructor(
    private userService: UserService
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
    this.userService.index(
      '',
      this.column,
      this.direction,
      this.currentPage,
      10,
      '',
      ''
    ).subscribe({
      next: (res:any) => {
        this.users=res.data.data;
        this.totalPages=res.data.pagination.last_page;
        this.currentPage=res.data.pagination.current_page;
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

}
