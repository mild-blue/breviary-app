import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PumpSpeedPage } from './pump-speed.page';

const routes: Routes = [
  {
    path: '',
    component: PumpSpeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PumpSpeedPageRoutingModule {
}
