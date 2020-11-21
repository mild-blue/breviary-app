import { Injectable } from '@angular/core';
import { HeparinRecommendation, Patient, PatientHistoryEntry } from '../../model/Patient';
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
        const patient = r as Patient;
        patient.date_of_birth = new Date(patient.date_of_birth);
        return patient;
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
      `${environment.apiUrl}/heparin-recommendation/recommendation`,
      {
        patient_id: id,
        current_aptt: aptt
      }
    ).pipe(first()).toPromise();
  }

  public findPatientByQR(code: string): Observable<Patient> {
    return this.http.get(
      `${environment.apiUrl}/patients/${code}`
    ).pipe(
      map((r: Object) => {
        const patient = r as Patient;

        console.log(patient);
        return patient;
      })
    );
  }
}
