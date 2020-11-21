import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services/api/api.service';
import { Patient, PatientHistoryEntry } from '@app/model/Patient';
import { NotificationService } from '@app/services/notification/notification.service';
import { IonDatetime } from '@ionic/angular';

interface TimeDiff {
  days: string
  hours: string
  minutes: string
  seconds: string
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
export class DetailPage implements OnInit {

  @ViewChild('datetime') datetime?: IonDatetime;

  public patient?: Patient;
  public historyEntries: PatientHistoryEntry[] = [];
  public timeLeft: string = '';
  public reminderOn?: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private notificationService: NotificationService) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this._initPatient(+id);
    }
  }

  ngOnInit() {
    if (this.nextReminderDate) {
      this._initTimeUpdate();
    }
  }

  get nextReminderDate(): Date | undefined {
    return this.notificationService.getNextReminderDate();
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
        const timeDiff = DetailPage._get_time_diff(this.nextReminderDate, new Date())
        this.timeLeft = `${timeDiff.days}d ${timeDiff.hours}:${timeDiff.minutes}:${timeDiff.seconds}`;
      }
    }, 1000);
  }

  private static _formatNumber(num: number) {
    return num < 10 ? `0${num}` : `${num}`
  }

  private static _get_time_diff(reminderDate: Date, now: Date): TimeDiff {
    if (reminderDate.getTime() <= now.getTime()) {
      return {
        days: '0',
        hours: '0',
        minutes: '0',
        seconds: '0',
      }
    }

    let delta = Math.abs(reminderDate.getTime() - now.getTime()) / 1000;

    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    const seconds = Math.floor(delta % 60);

    return {
      days: `${days}`,
      hours: DetailPage._formatNumber(hours),
      minutes: DetailPage._formatNumber(minutes),
      seconds: DetailPage._formatNumber(seconds)
    }
  }


  public getPatientAge(): number {
    if (!this.patient) {
      return 0;
    }
    const ageDifMs = Date.now() - this.patient.date_of_birth.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  public toggleReminder(): void {
    this.reminderOn = !this.reminderOn;

    if (this.reminderOn) {
      if (this.datetime) {
        this.datetime.open();
      }
    } else {
      this.notificationService.disable();
    }
  }
}
