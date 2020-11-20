export class Patient {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  height: number;
  weight: number;
  sex: PatientSex;
  target_aptt: Interval;
  actual_aptt: number;
  actual_aptt_updated_on: Date;
  actual_dosage: number;

  constructor() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.date_of_birth = new Date();
    this.height = 0;
    this.weight = 0;
    this.sex = PatientSex.M;
    this.target_aptt = {
      from: 0,
      to: 0
    };
    this.actual_aptt = 0;
    this.actual_aptt_updated_on = new Date();
    this.actual_dosage = 0;
  }
}

export enum PatientSex {
  M = 'male',
  F = 'female'
}

export interface Interval {
  from: number;
  to: number;
}
