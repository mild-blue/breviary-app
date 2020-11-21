import { Component, OnInit } from '@angular/core';
import { Patient } from '@app/model/Patient';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services/api/api.service';
import { NotificationService } from '@app/services/notification/notification.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss']
})
export class ReminderPage implements OnInit {

  public patient?: Patient;
  public reminder?: string;
  public on: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
              private nfService: NotificationService,
              private apiService: ApiService) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this._initPatient(+id);
    }
    const reminder = this.activatedRoute.snapshot.paramMap.get('reminder');
    if (reminder) {
      const date = new Date(reminder);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      this.nfService.setNextReminderDate(date);

      this.reminder = date.toISOString();
    }
  }

  ngOnInit() {
  }

  private _initPatient(id: number): void {
    this.apiService.getPatient(id).subscribe((p) => {
      this.patient = p;
    });
  }

  toggle() {
    this.on = !this.on;
    if (this.on && this.reminder) {
      this.nfService.setNextReminderDate(new Date(this.reminder));
    } else {
      this.nfService.disable();
    }
  }
}
