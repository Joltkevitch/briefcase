import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMonthSelectionComponent } from './calendar-month-selection.component';

describe('CalendarMonthSelectionComponent', () => {
  let component: CalendarMonthSelectionComponent;
  let fixture: ComponentFixture<CalendarMonthSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarMonthSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarMonthSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
