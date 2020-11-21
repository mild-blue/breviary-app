import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BolusRoutingModule } from './bolus-routing.module';

import { BolusPage } from './bolus.page';
import { PagesSharedModule } from '../../pages-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BolusRoutingModule,
    PagesSharedModule
  ],
  declarations: [BolusPage]
})
export class BolusModule {
}
