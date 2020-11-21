import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services/api/api.service';
import { Patient, PatientHistoryEntry } from '@app/model/Patient';
import { NotificationService } from '@app/services/notification/notification.service';
import { AlertController, IonDatetime } from '@ionic/angular';

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
  public isStopped: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private alertController: AlertController,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('here', this.nextReminderDate);
    if (this.nextReminderDate) {
      this._initTimeUpdate();
    }

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this._initPatient(+id);
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
      this.historyEntries = e.slice(0, 3);
    }));
  }

  private _initTimeUpdate(): void {
    setInterval(() => {
      if (this.nextReminderDate) {
        const timeDiff = DetailPage._get_time_diff(this.nextReminderDate, new Date());
        this.timeLeft = '';
        if (timeDiff.days !== '0') {
          this.timeLeft += `${timeDiff.days} days `;
        }
        this.timeLeft += `${timeDiff.hours === '00' ? '0' : timeDiff.hours}:${timeDiff.minutes}:${timeDiff.seconds}`;
        if (this.timeLeft === '0:0:0') {
          this.timeLeft = '';
        }
      }
    }, 1000);
  }

  private static _formatNumber(num: number) {
    return num < 10 ? `0${num}` : `${num}`;
  }

  private static _get_time_diff(reminderDate: Date, now: Date): TimeDiff {
    if (reminderDate.getTime() <= now.getTime()) {
      return {
        days: '0',
        hours: '0',
        minutes: '0',
        seconds: '0'
      };
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
    };
  }

  public toggleReminder(): void {
    console.log('toggle', this.nextReminderDate);
    if (this.nextReminderDate !== undefined) {
      this.notificationService.disable();
      this.timeLeft = '';
    } else {
      this.notificationService.setNextReminderDate(new Date());
      this._initTimeUpdate();
    }
  }

  public handleReminderDateChange(event: CustomEvent): void {
    const date = new Date(event.detail.value);
    if (date != this.nextReminderDate) {
      this.notificationService.setNextReminderDate(date);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: `Are you sure you want to stop infusion pump for patient ${this.patient?.first_name} ${this.patient?.last_name}?`,
      buttons: [
        {
          text: 'Stop patient infusion pump',
          cssClass: 'danger',
          handler: () => {
            this.isStopped = true;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }
}
