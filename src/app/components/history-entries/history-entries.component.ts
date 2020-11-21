import { Component, Input, OnInit } from '@angular/core';
import { Patient, PatientHistoryEntry } from '@app/model/Patient';

@Component({
  selector: 'app-history-entries',
  templateUrl: './history-entries.component.html',
  styleUrls: ['./history-entries.component.scss']
})
export class HistoryEntriesComponent implements OnInit {

  @Input() patient?: Patient;
  @Input() entries: PatientHistoryEntry[] = [];

  constructor() {
  }

  ngOnInit() {
  }

}
