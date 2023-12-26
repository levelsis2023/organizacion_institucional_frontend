import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SubinstitutionsComponent } from './subinstitutions/subinstitutions.component';

const routes: Routes = [
  {
    path:'index',
    component: IndexComponent
  },
  {
    path:':id/subinstitutions',
    component:SubinstitutionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionsRoutingModule { }
