import { addDays, startOfDay } from 'date-fns'

const today = new Date
const tomorrow = addDays(new Date(), 1);

export const todayFormatted = today.toISOString().split('T')[0];
export const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

export const dateFormatted = today.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});

export const dateFormattedForWeek = today.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
});

export function stripTimeFromDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
};

export function stripTimeFromDateUTC(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function isSelectedDate(date: string | Date, selectedDate: Date): boolean {
  let d: Date;
  
  if (typeof date === 'string') {
    if (!date.includes("T")) {
      d = new Date(date + "T00:00:00Z");
    } else {
      d = new Date(date);
    }
  } else {
    d = date;
  }
  
  const dateStripped = stripTimeFromDateUTC(d);
  const selectedDateStripped = stripTimeFromDateUTC(selectedDate);
  
  return dateStripped.getTime() === selectedDateStripped.getTime();
}


export function isInSelectedWeek(date: string | Date, referenceDate: Date): boolean {
  let d: Date;
  
  if (typeof date === 'string') {
    if (!date.includes("T")) {
      d = new Date(date + "T00:00:00Z");
    } else {
      d = new Date(date);
    }
  } else {
    d = date;
  }

  const strippedDate = stripTimeFromDateUTC(d);
  const strippedReferenceDate = stripTimeFromDateUTC(referenceDate);

  const startOfWeek = getStartOfWeek(strippedReferenceDate);
  const endOfWeek = getEndOfWeek(strippedReferenceDate);
  
  return startOfWeek <= strippedDate && strippedDate <= endOfWeek;
}

export function isInSelectedMonth(date: string | Date, referenceDate: Date): boolean {
  let d: Date;

  if (typeof date === 'string') {
    if (!date.includes("T")) {
      d = new Date(date + "T00:00:00Z");
    } else {
      d = new Date(date);
    }
  } else {
    d = date;
  }

  return d.getUTCMonth() === referenceDate.getUTCMonth() && d.getUTCFullYear() === referenceDate.getUTCFullYear();
}

function getStartOfWeek(date: Date): Date {
  const dayOfWeek = date.getUTCDay();
  const startOfWeek = new Date(date);
  if (dayOfWeek === 0) {
      startOfWeek.setUTCDate(date.getUTCDate() - 6);
  } else {
      startOfWeek.setUTCDate(date.getUTCDate() - (dayOfWeek - 1));
  }
  return startOfWeek;
}

function getEndOfWeek(date: Date): Date {
  const startOfWeek = getStartOfWeek(date);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);
  return endOfWeek;
}
