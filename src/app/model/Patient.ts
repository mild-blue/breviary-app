export interface Patient {
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
}

export enum PatientSex {
  M = 'male',
  F = 'female'
}

export interface Interval {
  from: number;
  to: number;
}
