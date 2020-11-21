import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewApttPageRoutingModule } from './new-aptt-routing.module';

import { NewApttPage } from './new-aptt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewApttPageRoutingModule
  ],
  declarations: [NewApttPage]
})
export class NewApttPageModule {
}
