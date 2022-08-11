import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDaySelectionComponent } from './calendar-day-selection.component';

describe('CalendarDaySelectionComponent', () => {
  let component: CalendarDaySelectionComponent;
  let fixture: ComponentFixture<CalendarDaySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarDaySelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarDaySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
