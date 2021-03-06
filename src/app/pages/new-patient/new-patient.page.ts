import { Component, OnInit } from '@angular/core';
import { DrugType, Patient } from '../../model/Patient';
import { ApiService } from '../../services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.page.html',
  styleUrls: ['./new-patient.page.scss']
})
export class NewPatientPage implements OnInit {

  public patient: Patient = new Patient();
  public types: typeof DrugType = DrugType;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private toastController: ToastController,
              private router: Router) {
    const type = this.activatedRoute.snapshot.paramMap.get('type');
    this.patient.drug_type = type && type.toUpperCase() === DrugType.I.valueOf() ? DrugType.I : DrugType.H;
  }

  ngOnInit() {
  }

  public save(patient: Patient): void {
    this.apiService.addPatient(patient).subscribe(p => {
      if (p.id) {
        this.presentToast('Patient added successfully').then(() => {
          this.router.navigate(['/detail', p.id, p.drug_type]);
        });
      }
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
