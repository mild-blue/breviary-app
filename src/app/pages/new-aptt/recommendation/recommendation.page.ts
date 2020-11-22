import { Component, OnInit } from '@angular/core';
import { DrugType, HeparinRecommendation, InsulinRecommendation, Patient } from '@app/model/Patient';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@app/services/notification/notification.service';
import { ApiService } from '@app/services/api/api.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.page.html',
  styleUrls: ['./recommendation.page.scss']
})
export class RecommendationPage implements OnInit {
  public patient?: Patient;
  public heparinRecommendation?: HeparinRecommendation;
  public insulinRecommendation?: InsulinRecommendation;
  public types: typeof DrugType = DrugType;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private nfService: NotificationService,
              private apiService: ApiService) {

  }

  ngOnInit() {
    this._initData();
  }

  private async _initData(): Promise<void> {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this._initPatient(+id);

      const aptt = this.activatedRoute.snapshot.paramMap.get('aptt');
      if (aptt && +aptt !== -1) {
        this.heparinRecommendation = await this.apiService.getPatientHeparinRecommendation(+id, +aptt) as HeparinRecommendation;
      }

      const tddi = this.activatedRoute.snapshot.paramMap.get('tddi');
      const glycemia = this.activatedRoute.snapshot.paramMap.get('glycemia');
      if (tddi && glycemia && +tddi !== -1 && +glycemia !== -1) {
        this.insulinRecommendation = await this.apiService.getPatientInsulinRecommendation(+id, +tddi, +glycemia) as InsulinRecommendation;
      }
    }
  }

  private _initPatient(id: number): void {
    this.apiService.getPatient(id).subscribe((p) => {
      this.patient = p;
    });
  }

  get nothingToShow(): boolean {
    if (this.patient?.drug_type === DrugType.H) {
      if (!this.heparinRecommendation) {
        return true;
      }

      return ((this.heparinRecommendation.actual_heparin_bolus_dosage !== undefined && this.heparinRecommendation.actual_heparin_bolus_dosage === this.heparinRecommendation.previous_heparin_bolus_dosage) || this.heparinRecommendation.actual_heparin_bolus_dosage === undefined) &&
        ((this.heparinRecommendation.actual_heparin_continuous_dosage !== undefined && this.heparinRecommendation.actual_heparin_continuous_dosage === this.heparinRecommendation.previous_heparin_continuous_dosage) || this.heparinRecommendation.actual_heparin_continuous_dosage === undefined) &&
        !this.heparinRecommendation.doctor_warning;
    }

    if (this.patient?.drug_type === DrugType.I) {
      if (!this.insulinRecommendation) {
        return true;
      }
    }

    return false;
  }

  public accept(): void {
    if (this.heparinRecommendation?.next_remainder) {
      const date = new Date(this.heparinRecommendation.next_remainder);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      this.nfService.setNextReminderDate(date);
    }

    if (this.patient) {
      this.router.navigate(['/detail', this.patient.id, this.patient.drug_type]);
    } else {
      this.router.navigate(['/home']);
    }
  }

}
