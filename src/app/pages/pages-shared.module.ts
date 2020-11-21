import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PatientCardComponent } from '../components/patient-card/patient-card.component';
import { IonicModule } from '@ionic/angular';

// import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PatientCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
    // RouterModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    PatientCardComponent
  ]
})
export class PagesSharedModule {
}
