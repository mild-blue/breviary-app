import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BolusPage } from './bolus.page';

const routes: Routes = [
  {
    path: '',
    component: BolusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BolusRoutingModule {
}
