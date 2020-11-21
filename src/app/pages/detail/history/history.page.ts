import { Component, OnInit } from '@angular/core';
import { Patient, PatientHistoryEntry } from '@app/model/Patient';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services/api/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss']
})
export class HistoryPage implements OnInit {

  public patient?: Patient;
  public historyEntries: PatientHistoryEntry[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this._initPatient(+id);
    }
  }

  private _initPatient(id: number): void {
    this.apiService.getPatient(id).subscribe((p) => {
      this.patient = p;

      this._getPatientHistory(id);
    });
  }

  ngOnInit() {
  }

  private _getPatientHistory(id: number): void {
    this.apiService.getPatientHistory(id).subscribe((e => {
      this.historyEntries = e.slice(2);
    }));
  }

}
