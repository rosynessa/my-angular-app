import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyforecastComponent } from './dailyforecast.component';

describe('DailyforecastComponent', () => {
  let component: DailyforecastComponent;
  let fixture: ComponentFixture<DailyforecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyforecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyforecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
