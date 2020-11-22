import { Component, OnInit } from '@angular/core';
import { DrugType, Patient, PatientHistoryEntry } from '@app/model/Patient';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services/api/api.service';
import { GraphItemInterface } from '@app/components/graph/graph.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss']
})
export class HistoryPage implements OnInit {

  public patient?: Patient;
  public historyEntries: PatientHistoryEntry[] = [];
  public types: typeof DrugType = DrugType;

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
      this.historyEntries = e;
    }));
  }

  getGraphData(): GraphItemInterface[] {
    const data: GraphItemInterface[] = [];
    for (const e of this.historyEntries) {
      if (this.patient?.drug_type === DrugType.H) {
        if (e.aptt !== null && e.aptt !== undefined) {
          data.push({
            value: e.aptt,
            label: e.date ? e.date.toISOString() : ''
          });
        }
      } else if (this.patient?.drug_type === DrugType.I) {
        if (e.glycemia_value !== null && e.glycemia_value !== undefined) {
          data.push({
            value: e.glycemia_value ?? 0,
            label: e.date ? e.date.toISOString() : ''
          });
        }
      }

    }
    return data;
  }

}
