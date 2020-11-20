import { Component, OnInit } from '@angular/core';
import { Patient } from '../../model/Patient';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.page.html',
  styleUrls: ['./new-patient.page.scss']
})
export class NewPatientPage implements OnInit {

  public patient: Patient = new Patient();

  constructor() {
  }

  ngOnInit() {
  }

  public save(): void {
    console.log(this.patient);
  }
}
