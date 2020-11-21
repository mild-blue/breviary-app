import { Component, OnInit } from '@angular/core';
import { HeparinRecommendation, Patient } from '@app/model/Patient';
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
  public r?: HeparinRecommendation;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private nfService: NotificationService,
              private apiService: ApiService) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this._initPatient(+id);
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
        const r = params.get('recommendation');
        if (r) {
          this.r = JSON.parse(r);
        }
      }
    );
  }

  private _initPatient(id: number): void {
    this.apiService.getPatient(id).subscribe((p) => {
      this.patient = p;
    });
  }

  get nothingToShow(): boolean {
    if (!this.r) {
      return true;
    }
    return ((this.r.actual_heparin_bolus_dosage !== undefined &&
      this.r.actual_heparin_bolus_dosage === this.r.previous_heparin_bolus_dosage) ||
      !this.r.actual_heparin_bolus_dosage) &&
      ((this.r.actual_heparin_continuous_dosage !== undefined &&
        this.r.actual_heparin_continuous_dosage === this.r.previous_heparin_continuous_dosage) ||
        !this.r.actual_heparin_continuous_dosage) &&
      !this.r.doctor_warning;
  }

  public accept(): void {
    if (this.r?.next_remainder) {
      const date = new Date(this.r.next_remainder);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      this.nfService.setNextReminderDate(date);
    }

    if (this.patient) {
      this.router.navigate(['/detail', this.patient.id]);
    } else {
      this.router.navigate(['/home']);
    }
  }

}
