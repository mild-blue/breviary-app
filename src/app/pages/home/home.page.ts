import { Component, OnInit } from '@angular/core';
import { DrugType, Patient } from '../../model/Patient';
import { ApiService } from '../../services/api/api.service';
import { HomeTab } from './home.interface';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  public hPatients: Patient[] = [];
  public iPatients: Patient[] = [];

  public activeTab: HomeTab = HomeTab.heparin;
  public tabs: typeof HomeTab = HomeTab;

  constructor(private apiService: ApiService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this._initPatients();
  }

  private _initPatients(): void {
    this.apiService.getPatients().subscribe((patients) => {
      this.hPatients = patients.filter(p => p.drug_type === DrugType.H);
      this.iPatients = patients.filter(p => p.drug_type === DrugType.I);
    });
  }
}
