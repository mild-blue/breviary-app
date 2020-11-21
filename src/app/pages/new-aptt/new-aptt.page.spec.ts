import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewApttPage } from './new-aptt.page';

describe('NewApttPage', () => {
  let component: NewApttPage;
  let fixture: ComponentFixture<NewApttPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewApttPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewApttPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
