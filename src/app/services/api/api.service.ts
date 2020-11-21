import { Injectable } from '@angular/core';
import { HeparinRecommendation, Patient, PatientHistoryEntry } from '@app/model/Patient';
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
        if (patient.date_of_birth) {
          patient.date_of_birth = new Date(patient.date_of_birth);
        }

        return patient;
      })
    );
  }

  public savePatient(patient: Patient): Observable<Patient> {
    return this.http.put(
      `${environment.apiUrl}/patients/${patient.id}`,
      {
        drug_type: patient.drug_type,
        target_aptt_low: patient.target_aptt?.low ?? 0,
        target_aptt_high: patient.target_aptt?.high ?? 0,
        tddi: patient.tddi,
        target_glycemia: patient.target_glycemia
      }
    ).pipe(
      map((r: Object) => {
        return r as Patient;
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
