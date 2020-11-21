import { Injectable } from '@angular/core';
import { DrugType, HeparinRecommendation, Patient, PatientHistoryEntry, PatientSex } from '@app/model/Patient';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private static _fixTimeZone(patient: Patient): Patient {
    if (patient.date_of_birth) {
      const date = new Date(patient.date_of_birth);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      patient.date_of_birth = date;
    }

    return patient;
  }

  public getPatients(): Observable<Patient[]> {
    return this.http.get(
      `${environment.apiUrl}/patients`
    ).pipe(
      map((r: Object) => {
        console.log(r);
        return r as Patient[];
      })
    );
  }

  public getPatient(id: number): Observable<Patient> {
    return this.http.get(
      `${environment.apiUrl}/patients/${id}`
    ).pipe(
      map((r: Object) => {
        return ApiService._fixTimeZone(r as Patient);
      })
    );
  }

  public savePatient(patient: Patient): Observable<Patient> {
    return this.http.put(
      `${environment.apiUrl}/patients/${patient.id}`,
      {
        first_name: patient.first_name ?? '',
        last_name: patient.last_name ?? '',
        date_of_birth: patient.date_of_birth?.toISOString() ?? new Date(),
        height: patient.height ?? 0,
        weight: patient.weight ?? 0,
        drug_type: patient.drug_type?.valueOf() ?? DrugType.H,
        sex: patient.sex?.valueOf() ?? PatientSex.M,
        target_aptt_low: patient.target_aptt?.low ?? 0,
        target_aptt_high: patient.target_aptt?.high ?? 0,
        tddi: patient.tddi ?? 0,
        target_glycemia: patient.target_glycemia ?? 0
      }
    ).pipe(
      map((r: Object) => {
        return ApiService._fixTimeZone(r as Patient);
      })
    );
  }

  public addPatient(patient: Patient): Observable<Patient> {
    return this.http.post(
      `${environment.apiUrl}/patients/`,
      {
        first_name: patient.first_name ?? '',
        last_name: patient.last_name ?? '',
        date_of_birth: patient.date_of_birth?.toISOString() ?? new Date(),
        height: patient.height ?? 0,
        weight: patient.weight ?? 0,
        drug_type: patient.drug_type?.valueOf() ?? DrugType.H,
        sex: patient.sex?.valueOf() ?? PatientSex.M,
        target_aptt_low: patient.target_aptt?.low ?? 0,
        target_aptt_high: patient.target_aptt?.high ?? 0,
        tddi: patient.tddi ?? 0,
        target_glycemia: patient.target_glycemia ?? 0
      }
    ).pipe(
      map((r: Object) => {
        return ApiService._fixTimeZone(r as Patient);
      })
    );
  }

  public getPatientHistory(id: number): Observable<PatientHistoryEntry[]> {
    return this.http.get(
      `${environment.apiUrl}/patients/history-entries/${id}`
    ).pipe(
      map((r: Object) => {
        return r as PatientHistoryEntry[];
      })
    );
  }

  public getPatientHeparinRecommendation(id: number, aptt: number): Promise<Object | HeparinRecommendation> {
    return this.http.post(
      `${environment.apiUrl}/recommendation/heparin`,
      {
        patient_id: id,
        current_aptt: aptt
      }
    ).pipe(first()).toPromise();
  }

  public findPatientByQR(): Observable<Patient> {
    return this.http.get(
      `${environment.apiUrl}/patients/qr-code`
    ).pipe(
      map((r: Object) => {
        return ApiService._fixTimeZone(r as Patient);
      })
    );
  }
}
