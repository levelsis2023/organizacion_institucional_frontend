import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubinstitutionsRoutingModule } from './subinstitutions-routing.module';
import { CreateComponent } from './modals/create/create.component';
import { UpdateComponent } from './modals/update/update.component';
import { DeleteComponent } from './modals/delete/delete.component';
import { IndexComponent } from './index/index.component';
import { SubinstitutionsComponent } from './subinstitutions.component';


@NgModule({
  declarations: [
    CreateComponent,
    UpdateComponent,
    DeleteComponent,
    IndexComponent,
    SubinstitutionsComponent
  ],
  imports: [
    CommonModule,
    SubinstitutionsRoutingModule
  ]
})
export class SubinstitutionsModule { }
