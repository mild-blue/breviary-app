import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patient } from '@app/model/Patient';

interface IntervalRange {
  lower: number;
  upper: number;
}

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

  @Input() patient?: Patient;
  @Output() formSubmitted: EventEmitter<Patient> = new EventEmitter<Patient>();

  constructor() {
  }

  ngOnInit() {
  }

  public save(): void {
    // if(!this.patient || !this.patient.first_name || !this.patient.last_name || !this.patient.date_of_birth ||
    // !this.patient.height || !this.patient.weight || !this.patient)
    this.formSubmitted.emit(this.patient);
  }

  public getPatientDate(): string {
    if (!this.patient?.date_of_birth) {
      const date = new Date();
      date.setFullYear(1950);
      return date.toISOString();
    }
    const date = this.patient.date_of_birth;
    return date.toISOString();
  }

  public setPatientDate(event: CustomEvent): void {
    if (!this.patient) {
      return;
    }
    this.patient.date_of_birth = new Date(event.detail.value);
  }

  public getPatientRange(): IntervalRange | undefined {
    if (!this.patient?.target_aptt) {
      return { lower: 2, upper: 2.5 };
    }
    return { lower: this.patient.target_aptt.low, upper: this.patient.target_aptt.high };
  }

  public setPatientRange(event: CustomEvent): void {
    if (!this.patient) {
      return;
    }

    const range: IntervalRange = event.detail.value;
    this.patient.target_aptt = {
      low: +range.lower.toFixed(1),
      high: +range.upper.toFixed(1)
    };
  }
}
