import { Component, OnInit } from '@angular/core';
import { Patient } from '@app/model/Patient';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/services/api/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-aptt',
  templateUrl: './new-aptt.page.html',
  styleUrls: ['./new-aptt.page.scss']
})
export class NewApttPage implements OnInit {

  public patient?: Patient;
  public apttValue?: number;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private location: Location,
              private router: Router) {
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
    if (!this.apttValue || !this.patient) {
      return;
    }

    this.apiService.getPatientHeparinRecommendation(this.patient.id, this.apttValue).subscribe(r => {
      this.router.navigate(['recommendation', this.patient?.id ?? 0, JSON.stringify(r)]);
    });
  }

  public cancel(): void {
    this.location.back();
  }
}
