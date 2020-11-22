import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PatientCardComponent } from '../components/patient-card/patient-card.component';
import { IonicModule } from '@ionic/angular';
import { PatientFormComponent } from '../components/patient-form/patient-form.component';
import { FormsModule } from '@angular/forms';
import { PatientInfoComponent } from '../components/patient-info/patient-info.component';
import { HistoryEntriesComponent } from '../components/history-entries/history-entries.component';
import { GraphComponent } from '../components/graph/graph.component';

// import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PatientCardComponent,
    PatientFormComponent,
    PatientInfoComponent,
    HistoryEntriesComponent,
    GraphComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
    // RouterModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    PatientCardComponent,
    PatientFormComponent,
    PatientInfoComponent,
    HistoryEntriesComponent,
    GraphComponent
  ]
})
export class PagesSharedModule {
}
