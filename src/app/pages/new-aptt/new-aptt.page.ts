import { Component, OnInit } from '@angular/core';
import { DrugType, Patient } from '@app/model/Patient';
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
  public tddi?: number;
  public target_glycemia?: number;
  public types: typeof DrugType = DrugType;

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

  public async save(): Promise<void> {
    if (this.patient?.drug_type === DrugType.H) {
      if (!this.apttValue) {
        return;
      }

      this.router.navigate(['/new-aptt/', this.patient.id, 'recommendation', this.apttValue, -1, -1]);
    }

    if (this.patient?.drug_type === DrugType.I) {
      if (!this.tddi || !this.target_glycemia) {
        return;
      }

      this.router.navigate(['/new-aptt/', this.patient.id, 'recommendation', -1, this.tddi, this.target_glycemia]);
    }
  }

  public cancel(): void {
    this.location.back();
  }
}
