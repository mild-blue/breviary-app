import { Component, OnInit } from '@angular/core';
import { Patient } from '../../model/Patient';

interface IntervalRange {
  lower: number;
  upper: number;
}

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

  public getPatientDate(): string {
    const date = this.patient.date_of_birth;
    return date.toISOString();
  }

  public setPatientDate(event: CustomEvent): void {
    this.patient.date_of_birth = new Date(event.detail.value);
  }

  public getPatientRange(): IntervalRange {
    return { lower: this.patient.target_aptt.low, upper: this.patient.target_aptt.high };
  }

  public setPatientRange(event: CustomEvent): void {
    const range: IntervalRange = event.detail.value;
    this.patient.target_aptt = {
      low: +range.lower.toFixed(1),
      high: +range.upper.toFixed(1)
    };
  }
}
