import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss']
})
export class ScanQrPage implements OnInit {
  qrContent?: string

  constructor(private barcodeScanner: BarcodeScanner) {}

  ngOnInit() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if(!barcodeData.cancelled) {
        this.qrContent = barcodeData.text
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
