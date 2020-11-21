import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewApttPage } from './new-aptt.page';

const routes: Routes = [
  {
    path: '',
    component: NewApttPage
  },
  {
    path: 'recommendation',
    loadChildren: () => import('./bolus/bolus.module').then(m => m.BolusModule)
  },
  {
    path: 'pump-speed/:speed/:reminder',
    loadChildren: () => import('./pump-speed/pump-speed.module').then(m => m.PumpSpeedPageModule)
  },
  {
    path: 'reminder/:reminder',
    loadChildren: () => import('./reminder/reminder.module').then(m => m.ReminderPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewApttPageRoutingModule {
}
