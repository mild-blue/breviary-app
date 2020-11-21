import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BolusPage } from './bolus.page';

describe('BolusPage', () => {
  let component: BolusPage;
  let fixture: ComponentFixture<BolusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BolusPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BolusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
