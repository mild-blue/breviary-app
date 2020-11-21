import { Injectable } from '@angular/core';
import { Patient } from '../../model/Patient';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}
