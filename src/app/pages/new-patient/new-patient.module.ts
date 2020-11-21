import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPatientRoutingModule } from './new-patient-routing.module';

import { NewPatientPage } from './new-patient.page';
import { PagesSharedModule } from '../pages-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPatientRoutingModule,
    PagesSharedModule
  ],
  declarations: [NewPatientPage]
})
export class NewPatientModule {
}
