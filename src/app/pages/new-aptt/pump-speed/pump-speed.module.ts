import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PumpSpeedPageRoutingModule } from './pump-speed-routing.module';

import { PumpSpeedPage } from './pump-speed.page';
import { PagesSharedModule } from '../../pages-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PumpSpeedPageRoutingModule,
    PagesSharedModule
  ],
  declarations: [PumpSpeedPage]
})
export class PumpSpeedPageModule {
}
