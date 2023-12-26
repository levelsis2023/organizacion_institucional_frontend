import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>import('./users/users.module').then(e=>e.UsersModule)
  },
  {
    path:'institutions',
    loadChildren: ()=>import('./institutions/institutions.module').then(e=>e.InstitutionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
