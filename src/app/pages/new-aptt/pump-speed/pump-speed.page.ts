import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services/api/api.service';
import { Patient } from '@app/model/Patient';

@Component({
  selector: 'app-pump-speed',
  templateUrl: './pump-speed.page.html',
  styleUrls: ['./pump-speed.page.scss']
})
export class PumpSpeedPage implements OnInit {

  public patient?: Patient;
  public speed?: number;
  public reminder?: string;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this._initPatient(+id);
    }
    const speed = this.activatedRoute.snapshot.paramMap.get('speed');
    if (speed) {
      this.speed = +speed;
    }
    const reminder = this.activatedRoute.snapshot.paramMap.get('reminder');
    if (reminder) {
      this.reminder = reminder;
    }
  }

  ngOnInit() {
  }

  private _initPatient(id: number): void {
    this.apiService.getPatient(id).subscribe((p) => {
      this.patient = p;
    });
  }

}
