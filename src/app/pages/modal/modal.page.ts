import { Component, Input, OnInit } from '@angular/core';
import { DrugType, Patient } from '@app/model/Patient';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss']
})
export class ModalPage implements OnInit {

  @Input() patient?: Patient;
  @Input() type?: DrugType;

  constructor(private modalCtrl: ModalController,
              private router: Router) {
  }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    if (this.patient && this.type) {
      this.router.navigate(['/detail', this.patient.id, this.type, 'more-info']);
    }
  }

}
