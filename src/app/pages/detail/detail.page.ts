import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services/api/api.service';
import { Patient, PatientHistoryEntry } from '@app/model/Patient';
import { NotificationService } from '@app/services/notification/notification.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
export class DetailPage implements OnInit {

  public patient?: Patient;
  public historyEntries: PatientHistoryEntry[] = [];
  public timeLeft: string = '';
  public nextReminderDate?: Date;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private notificationService: NotificationService) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this._initPatient(+id);
    }
  }

  ngOnInit() {
    this.nextReminderDate = this.notificationService.getNextReminderDate();
    if (this.nextReminderDate) {
      this._initTimeUpdate();
    }
  }

  private _initPatient(id: number): void {
    this.apiService.getPatient(id).subscribe((p) => {
      this.patient = p;

      this._getPatientHistory(id);
    });
  }

  private _getPatientHistory(id: number): void {
    this.apiService.getPatientHistory(id).subscribe((e => {
      this.historyEntries = e;
    }));
  }

  private _initTimeUpdate(): void {
    setInterval(() => {
      if (this.nextReminderDate) {
        // todo: luky
        const start = new Date().getTime();
        const end = this.nextReminderDate.getTime();

        var diff = (start - end) / 1000;
        diff /= 60;
        const seconds = Math.abs(Math.round(diff));

        console.log(seconds);
        this.timeLeft = '';
      }
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
