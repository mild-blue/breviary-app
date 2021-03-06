export class Patient {
  id: number;
  first_name?: string;
  last_name?: string;
  date_of_birth?: Date;
  height?: number;
  weight?: number;
  sex?: PatientSex;
  target_aptt?: Interval;
  actual_aptt?: number;
  previous_aptt?: number;
  actual_aptt_updated_on?: Date;
  actual_dosage?: number;
  previous_dosage?: number;
  drug_type?: DrugType;
  tddi?: number;
  target_glycemia?: number;

  constructor() {
    this.id = 0;
    this.tddi = 50;
    this.target_glycemia = 6;
  }
}

export enum PatientSex {
  M = 'M',
  F = 'F'
}

export enum DrugType {
  H = 'HEPARIN',
  I = 'INSULIN'
}

export interface Interval {
  low: number;
  high: number;
}

export interface HeparinRecommendation {
  actual_heparin_bolus_dosage: number;
  actual_heparin_continuous_dosage: number;
  doctor_warning: string;
  next_remainder: Date;
  previous_heparin_bolus_dosage: number;
  previous_heparin_continuous_dosage: number;
}


export interface InsulinRecommendation {
  dosage: number;
}

export interface PatientHistoryEntry {
  date: Date;
  aptt?: number;
  bolus?: number;
  heparin_continuous?: number;
  carbohydrate_intake?: number;
  dosage?: number;
  glycemia_value?: number;
}
