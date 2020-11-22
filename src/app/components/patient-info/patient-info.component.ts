import { Component, Input, OnInit } from '@angular/core';
import { DrugType, Patient } from '@app/model/Patient';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {

  @Input() patient?: Patient;
  public types: typeof DrugType = DrugType;

  constructor() {
  }

  ngOnInit() {
  }

  public getPatientAge(): number {
    if (!this.patient?.date_of_birth) {
      return 0;
    }
    const ageDifMs = Date.now() - this.patient.date_of_birth.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
