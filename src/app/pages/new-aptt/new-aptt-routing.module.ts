import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewApttPage } from './new-aptt.page';

const routes: Routes = [
  {
    path: '',
    component: NewApttPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewApttPageRoutingModule {
}