import { Component, ElementRef, OnInit } from '@angular/core';
import { NotificationService } from '@app/services/notification/notification.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(private notificationService: NotificationService,
              private el: ElementRef) {
  }

  ngOnInit() {
  }

}
