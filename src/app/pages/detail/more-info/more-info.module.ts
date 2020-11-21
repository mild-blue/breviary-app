import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreInfoPageRoutingModule } from './more-info-routing.module';

import { MoreInfoPage } from './more-info.page';
import { PagesSharedModule } from '../../pages-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreInfoPageRoutingModule,
    PagesSharedModule
  ],
  declarations: [MoreInfoPage]
})
export class MoreInfoPageModule {
}
