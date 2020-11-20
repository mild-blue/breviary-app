import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewPatientPage } from './new-patient.page';

const routes: Routes = [
  {
    path: '',
    component: NewPatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPatientRoutingModule {
}
