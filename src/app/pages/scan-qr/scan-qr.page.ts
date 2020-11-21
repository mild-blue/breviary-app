import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ApiService } from '@app/services/api/api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss']
})
export class ScanQrPage implements OnInit {
  public qrContent?: string;

  constructor(private barcodeScanner: BarcodeScanner,
              private alertController: AlertController,
              private toastController: ToastController,
              private router: Router,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (!barcodeData.cancelled) {
        this.qrContent = barcodeData.text;

        if (this.qrContent) {
          this.apiService.findPatientByQR().subscribe(
            (p) => {
              this.presentToast('Patient retrieved from IKEM database').then(() => {
                this.router.navigate(['/detail/', p.id, '/more-info']);
              });
            },
            () => this.presentAlert('No patient found in database.'));
        }
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  async presentToast(text: string): Promise<void> {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      position: 'top',
      color: 'success',
      cssClass: 'ion-text-center'
    });

    return toast.present();
  }

  async presentAlert(text: string) {
    const alert = await this.alertController.create({
      message: text,
      buttons: [
        {
          text: 'Add patient manually',
          handler: () => {
            this.router.navigate(['/new']);
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
