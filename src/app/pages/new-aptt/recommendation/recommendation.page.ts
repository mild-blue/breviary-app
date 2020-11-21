import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services/api/api.service';
import { Patient } from '@app/model/Patient';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.page.html',
  styleUrls: ['./recommendation.page.scss']
})
export class RecommendationPage implements OnInit {

  public patient?: Patient;

  public bolus?: number;
  public pumpSpeed?: number;

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

  public save(): void {
    if (!this.bolus || !this.pumpSpeed || !this.patient) {
      return;
    }

    console.log(this.bolus, this.pumpSpeed);

    // this.apiService.getPatientHeparinRecommendation(this.patient.id, this.apttValue).subscribe(r => {
    //   this.router.navigate(['recommendation', this.patient?.id ?? 0, JSON.stringify(r)]);
    // });
  }
}
