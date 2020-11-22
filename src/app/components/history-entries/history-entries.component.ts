import { Component, Input, OnInit } from '@angular/core';
import { DrugType, Patient, PatientHistoryEntry } from '@app/model/Patient';

@Component({
  selector: 'app-history-entries',
  templateUrl: './history-entries.component.html',
  styleUrls: ['./history-entries.component.scss']
})
export class HistoryEntriesComponent implements OnInit {

  @Input() patient?: Patient;
  @Input() entries: PatientHistoryEntry[] = [];

  public types: typeof DrugType = DrugType;

  constructor() {
  }

  ngOnInit() {
  }


  getDate(date: Date | undefined): string {
    return date ? date.toISOString() : '';
  }
}
