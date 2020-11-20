import { Component, OnInit } from '@angular/core';
import { Patient } from '../../model/Patient';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  public patients: Patient[];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this._initPatients();
  }

  private _initPatients(): void {
    this.apiService.getPatients().subscribe((patients) => {
      this.patients = patients;
    });
  }
}
