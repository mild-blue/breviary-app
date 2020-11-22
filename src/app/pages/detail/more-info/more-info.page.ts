import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/services/api/api.service';
import { DrugType, Patient } from '@app/model/Patient';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.page.html',
  styleUrls: ['./more-info.page.scss']
})
export class MoreInfoPage implements OnInit {

  public patient?: Patient;
  public types: typeof DrugType = DrugType;

  constructor(private activatedRoute: ActivatedRoute,
              private toastController: ToastController,
              private router: Router,
              private apiService: ApiService) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const type = this.activatedRoute.snapshot.paramMap.get('type');
    if (id && type) {
      this._initPatient(+id, type);
    }
  }

  ngOnInit() {
  }

  private _initPatient(id: number, type: string): void {
    this.apiService.getPatient(id).subscribe((p) => {
      this.patient = p;
      this.patient.drug_type = type.toUpperCase() === DrugType.I ? DrugType.I : DrugType.H;
    });
  }

  public save(patient: Patient): void {
    this.apiService.savePatient(patient).subscribe(p => {
      this.presentToast('Patient saved successfully').then(() => {
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
