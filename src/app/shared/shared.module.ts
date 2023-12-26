import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NgbModalModule, NgbPaginationModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { SortIconComponent } from './components/sort-icon/sort-icon.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SortIconComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbTooltip,
    NgbPaginationModule,
    InlineSVGModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  exports: [
    NgbTooltip,
    NgbPaginationModule,
    SortIconComponent,
    ReactiveFormsModule,
    NgbModalModule
  ]
})
export class SharedModule { }
