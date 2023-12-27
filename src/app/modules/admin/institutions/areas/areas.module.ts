import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './modals/create/create.component';
import { UpdateComponent } from './modals/update/update.component';
import { DeleteComponent } from './modals/delete/delete.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    AreasRoutingModule,
    SharedModule
  ]
})
export class AreasModule { }
