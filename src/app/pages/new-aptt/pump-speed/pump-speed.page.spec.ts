import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PumpSpeedPage } from './pump-speed.page';

describe('PumpSpeedPage', () => {
  let component: PumpSpeedPage;
  let fixture: ComponentFixture<PumpSpeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PumpSpeedPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PumpSpeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
