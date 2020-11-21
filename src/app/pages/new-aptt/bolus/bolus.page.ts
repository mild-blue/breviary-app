import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/services/api/api.service';
import { HeparinRecommendation, Patient } from '@app/model/Patient';
import { NotificationService } from '@app/services/notification/notification.service';

@Component({
  selector: 'app-bolus',
  templateUrl: './bolus.page.html',
  styleUrls: ['./bolus.page.scss']
})
export class BolusPage implements OnInit {

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
    this.activatedRoute.queryParamMap
    .subscribe((params) => {
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

  public getDate(): string {
    if (!this.r) {
      return '';
    }
    const date = this.r.next_remainder;
    return date.toISOString();
  }

  public setDate(event: CustomEvent): void {
    if (!this.r) {
      return;
    }
    this.r.next_remainder = new Date(event.detail.value);
  }

  public save(): void {
    if (!this.patient) {
      return;
    }

    if (this.r) {
      this.nfService.setNextReminderDate(new Date(this.r.next_remainder));
    }

    this.router.navigate(['/detail/', this.patient.id]);
  }
}
