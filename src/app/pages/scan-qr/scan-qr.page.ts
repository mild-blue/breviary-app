import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ApiService } from '@app/services/api/api.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DrugType } from '@app/model/Patient';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss']
})
export class ScanQrPage implements OnInit {
  public qrContent?: string;
  public type: DrugType = DrugType.H;
  public types: typeof DrugType = DrugType;

  constructor(private activatedRoute: ActivatedRoute,
              private barcodeScanner: BarcodeScanner,
              private alertController: AlertController,
              private router: Router,
              private apiService: ApiService) {
    const type = this.activatedRoute.snapshot.paramMap.get('type');
    this.type = type && type.toUpperCase() === DrugType.I.valueOf() ? DrugType.I : DrugType.H;
  }

  ngOnInit() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (!barcodeData.cancelled) {
        this.qrContent = barcodeData.text;

        if (this.qrContent) {
          this.apiService.findPatientByQR().subscribe(
            (p) => {
              this.presentSuccessAlert('Patient retrieved from IKEM database.', p.id);
            },
            () => this.presentAlert('No patient found in database.'));
        }
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  async presentSuccessAlert(text: string, id: number) {
    const alert = await this.alertController.create({
      message: text,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/detail', id, 'more-info', this.type]);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(text: string) {
    const alert = await this.alertController.create({
      message: text,
      buttons: [
        {
          text: 'Add patient manually',
          handler: () => {
            this.router.navigate(['/new', this.type]);
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }
}
