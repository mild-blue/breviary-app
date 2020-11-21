import { Injectable } from '@angular/core';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private nextReminderDate?: Date;

  constructor(private platform: Platform) {
  }

  public disable(): void {
    localStorage.removeItem('reminder');
    this.nextReminderDate = undefined;
  }

  public setNextReminderDate(date: Date): void {
    localStorage.setItem('reminder', date.toISOString());
    this.nextReminderDate = date;
  }

  public getNextReminderDate(): Date | undefined {
    const r = localStorage.getItem('reminder');
    if (r) {
      return new Date(r);
    }

    return this.nextReminderDate;
  }

  public scheduleLocalNotification(showAfterHr: number): void {
    const isAndroid = this.platform.is('android');

    // Schedule delayed notification
    // this.localNotifications.schedule({
    //   title: 'aPTT check for patient',
    //   text: 'Don\'t forget to check aPTT level for the patient',
    //   // trigger: { in: 15, unit: ELocalNotificationTriggerUnit.SECOND }, // todo: change to hours
    //   sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
    //   foreground: true,
    //   sticky: true,
    //   lockscreen: true,
    //   priority: 2,
    //   vibrate: true,
    //   launch: true
    // });
    //
    // this.localNotifications.on('click').subscribe(data => {
    //   console.log(data);
    // });
  }

  // public showNotificcation()
}
