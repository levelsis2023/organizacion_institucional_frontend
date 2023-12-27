import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionsRoutingModule } from './positions-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './modals/create/create.component';
import { UpdateComponent } from './modals/update/update.component';
import { DeleteComponent } from './modals/delete/delete.component';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    PositionsRoutingModule
  ]
})
export class PositionsModule { }
