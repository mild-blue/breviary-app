import { Component, OnInit } from '@angular/core';
import { Patient } from '../../model/Patient';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.page.html',
  styleUrls: ['./new-patient.page.scss']
})
export class NewPatientPage implements OnInit {

  public patient: Patient = new Patient();

  constructor(private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit() {
  }

  public save(patient: Patient): void {
    this.apiService.addPatient(patient).subscribe(p => {
      console.log('P from BE', p);
      // this.router.navigate(['/home']);
    });
  }
}
