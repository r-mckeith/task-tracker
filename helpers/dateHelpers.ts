import { addDays, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns'

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

export function isToday(date: string | Date | null): boolean {
  if (!date) {
    return false;
  }
  const inputDate = new Date(`${date}T12:00:00`);
  const strippedInputDate = stripTimeFromDate(inputDate);

  const currentLocalDate = stripTimeFromDate(new Date());

  return strippedInputDate.getTime() === currentLocalDate.getTime();
};

// dateHelpers.js

export function isInSelectedWeek(date: string, referenceDate: Date): boolean {
  const d = new Date(date);
  const startOfWeek = getStartOfWeek(referenceDate);
  const endOfWeek = getEndOfWeek(referenceDate);
  return startOfWeek <= d && d <= endOfWeek;
}

function getStartOfWeek(date: Date): Date {
  const result = new Date(date);
  result.setDate(date.getDate() - date.getDay() + 1);
  result.setHours(0, 0, 0, 0);
  return result;
}

function getEndOfWeek(date: Date): Date {
  const result = new Date(date);
  result.setDate(date.getDate() - date.getDay() + 7);
  result.setHours(23, 59, 59, 999);
  return result;
}



// export function isInCurrentWeek(date: string | Date | null): boolean {
//   if (!date) {
//     return false;
//   }
//   const inputDate = new Date(`${date}T12:00:00`);
//   const localInputDate = stripTimeFromDate(inputDate);

//   const now = new Date();
//   const localStartOfWeek = stripTimeFromDate(startOfWeek(now, { weekStartsOn: 1 }));
//   const localEndOfWeek = stripTimeFromDate(endOfWeek(now, { weekStartsOn: 1 }));
  
//   return isWithinInterval(localInputDate, { start: localStartOfWeek, end: localEndOfWeek });
// };

export function isInCurrentMonth(date: string | Date | null): boolean {
  if (!date) {
    return false;
  }
  
  const inputDate = new Date(`${date}T12:00:00`);

  const now = new Date();

  return (inputDate.getMonth() === now.getMonth()) && (inputDate.getFullYear() === now.getFullYear());
}
