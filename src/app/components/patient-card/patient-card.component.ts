import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '@app/model/Patient';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss']
})
export class PatientCardComponent implements OnInit {

  @Input() patient?: Patient;

  constructor() {
  }

  ngOnInit() {
  }
}
