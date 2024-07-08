import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherhistoryComponent } from './weatherhistory.component';

describe('WeatherhistoryComponent', () => {
  let component: WeatherhistoryComponent;
  let fixture: ComponentFixture<WeatherhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherhistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
