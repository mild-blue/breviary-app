import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private localNotifications: LocalNotifications,
              private platform: Platform) {
  }

  public scheduleLocalNotification(showAfterHr: number): void {
    const isAndroid = this.platform.is('android');

    // Schedule delayed notification
    this.localNotifications.schedule({
      title: 'aPTT check for patient',
      text: 'Don\'t forget to check aPTT level for the patient',
      // trigger: { in: 15, unit: ELocalNotificationTriggerUnit.SECOND }, // todo: change to hours
      sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
      foreground: true,
      sticky: true,
      lockscreen: true,
      priority: 2,
      vibrate: true,
      launch: true
    });

    this.localNotifications.on('click').subscribe(data => {
      console.log(data);
    });
  }

  // public showNotificcation()
}
