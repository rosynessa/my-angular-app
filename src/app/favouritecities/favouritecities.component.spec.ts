import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritecitiesComponent } from './favouritecities.component';

describe('FavouritecitiesComponent', () => {
  let component: FavouritecitiesComponent;
  let fixture: ComponentFixture<FavouritecitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritecitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritecitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
