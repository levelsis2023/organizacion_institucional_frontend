import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionsRoutingModule } from './institutions-routing.module';
import { InstitutionsComponent } from './institutions.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './modals/create/create.component';
import { UpdateComponent } from './modals/update/update.component';
import { DeleteComponent } from './modals/delete/delete.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubinstitutionsComponent } from './subinstitutions/subinstitutions.component';


@NgModule({
  declarations: [
    InstitutionsComponent,
    IndexComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent,
    SubinstitutionsComponent
  ],
  imports: [
    CommonModule,
    InstitutionsRoutingModule,
    SharedModule
  ]
})
export class InstitutionsModule { }
