export {};
export enum Month {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  Agoust = 7,
  September = 8,
  Octuber = 9,
  November = 10,
  December = 11,
}

export enum WeekDay {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export enum WeekDayForNormalPeople {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

declare global {
  interface Date {
    getMinutesOnDay(): number;
  }

  interface Array<T> {
    hasItems(): boolean;
  }
}

export namespace WeekDay {
  export function toString(weekDay: WeekDay): string {
    return WeekDay[weekDay];
  }

  export function nextWeekDay(weekDay: WeekDay): WeekDay {
    if (weekDay === WeekDay.Sunday) {
      return WeekDay.Monday;
    }
    return weekDay + 1;
  }

  export function previousWeekDay(weekDay: WeekDay): WeekDay {
    if (weekDay === WeekDay.Monday) {
      return WeekDay.Sunday;
    }
    return weekDay - 1;
  }

  export function convertToStringArray(): string[] {
    return Object.values(WeekDayForNormalPeople)
      .filter((v) => isNaN(Number(v)) && typeof v !== 'function')
      .map((v) => v.toString());
  }
}

export namespace Month {
  export function toString(month?: Month): string {
    return month ? Month[month] : '';
  }

  export function nextMonth(month: Month): Month {
    if (month === Month.December) {
      return Month.January;
    }
    return month + 1;
  }

  export function previousMonth(month: Month): Month {
    if (month === Month.January) {
      return Month.December;
    }
    return month - 1;
  }

  export function convertToStringArray(): string[] {
    return Object.values(Month)
      .filter((v) => isNaN(Number(v)) && typeof v !== 'function')
      .map((v) => v.toString());
  }
}

Date.prototype.getMinutesOnDay = function (): number {
  const minutesToSeconds = this.getMinutes();
  return this.getHours() * 60 + minutesToSeconds;
};

Array.prototype.hasItems = function (): boolean {
  return this.length > 0;
};
