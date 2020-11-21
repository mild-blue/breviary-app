import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoryEntriesComponent } from './history-entries.component';

describe('HistoryEntriesComponent', () => {
  let component: HistoryEntriesComponent;
  let fixture: ComponentFixture<HistoryEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryEntriesComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
