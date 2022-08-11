import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarYearSelectionComponent } from './calendar-year-selection.component';

describe('CalendarYearSelectionComponent', () => {
  let component: CalendarYearSelectionComponent;
  let fixture: ComponentFixture<CalendarYearSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarYearSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarYearSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
