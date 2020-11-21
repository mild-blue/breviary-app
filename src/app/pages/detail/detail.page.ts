import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services/api/api.service';
import { Patient } from '@app/model/Patient';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
export class DetailPage implements OnInit {

  public patient?: Patient;
  public notificationTriggerTime: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this._initPatient(+id);
    }
  }

  ngOnInit() {
    this._initTimeUpdate();
  }

  private _initPatient(id: number): void {
    this.apiService.getPatient(id).subscribe((p) => {
      this.patient = p;

      this._getPatientHistory(id);
    });
  }

  private _getPatientHistory(id: number): void {
    this.apiService.getPatientHistory(id).subscribe();
  }

  private _initTimeUpdate(): void {
    setInterval(() => {
      this.notificationTriggerTime = new Date().toISOString();
    }, 1000);
  }

  public getPatientAge(): number {
    if (!this.patient) {
      return 0;
    }
    const ageDifMs = Date.now() - this.patient.date_of_birth.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
