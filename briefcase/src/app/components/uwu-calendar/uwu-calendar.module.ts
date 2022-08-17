import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './uwu-calendar.component';
import { CalendarYearSelectionComponent } from './calendar-year-selection/calendar-year-selection.component';
import { CalendarMonthSelectionComponent } from './calendar-month-selection/calendar-month-selection.component';
import { CalendarDaySelectionComponent } from './calendar-day-selection/calendar-day-selection.component';
import { UwuCalendarService } from './uwu-calenda.service';
import { DayEventDirective } from './directives/event-date.directive';
@NgModule({
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
  declarations: [
    CalendarComponent,
    CalendarYearSelectionComponent,
    CalendarMonthSelectionComponent,
    CalendarDaySelectionComponent,
    DayEventDirective
  ],
  exports: [CalendarComponent],
  providers: [DatePipe, UwuCalendarService],
})
export class UwuCalendarModule {}
