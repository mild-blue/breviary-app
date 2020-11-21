import { Component, OnInit } from '@angular/core';
import { Patient } from '../../model/Patient';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.page.html',
  styleUrls: ['./new-patient.page.scss']
})
export class NewPatientPage implements OnInit {

  public patient: Patient = new Patient();

  constructor(private apiService: ApiService,
              private toastController: ToastController,
              private router: Router) {
  }

  ngOnInit() {
  }

  public save(patient: Patient): void {
    this.apiService.addPatient(patient).subscribe(p => {
      console.log('P from BE', p);
      this.presentToast('Patient added successfully').then(() => {
        this.router.navigate(['/detail', p.id]);
      });
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
}
