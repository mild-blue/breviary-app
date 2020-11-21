import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailPage } from './detail.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  },
  {
    path: 'more-info',
    loadChildren: () => import('./more-info/more-info.module').then(m => m.MoreInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailPageRoutingModule {
}
