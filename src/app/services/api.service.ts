import { Injectable } from '@angular/core';
import { Patient } from '../model/Patient';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
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
      `${environment.apiUrl}`
    ).pipe(
      map((r: Patient[]) => {
        console.log(r);
        return r;
      })
    );
  }
}
