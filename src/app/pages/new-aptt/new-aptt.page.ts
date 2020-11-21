import { Component, OnInit } from '@angular/core';
import { Patient } from '@app/model/Patient';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services/api/api.service';

@Component({
  selector: 'app-new-aptt',
  templateUrl: './new-aptt.page.html',
  styleUrls: ['./new-aptt.page.scss']
})
export class NewApttPage implements OnInit {

  public patient?: Patient;
  public apttValue?: number;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this._initPatient(+id);
    }
  }

  ngOnInit() {
  }

  private _initPatient(id: number): void {
    this.apiService.getPatient(id).subscribe((p) => {
      this.patient = p;
    });
  }

  public getPatientAge(): number {
    if (!this.patient) {
      return 0;
    }
    const ageDifMs = Date.now() - this.patient.date_of_birth.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  public save(): void {
    if (!this.apttValue || !this.patient) {
      return;
    }

    this.apiService.getPatientHeparinRecommendation(this.patient.id, this.apttValue).subscribe(r => {

    });
  }
}
