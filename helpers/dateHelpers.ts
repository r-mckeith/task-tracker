import { addDays, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns'

const today = new Date
const tomorrow = addDays(new Date(), 1);

export const todayFormatted = today.toISOString().split('T')[0];
export const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

function stripTimeFromDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
};

export function isInCurrentWeek(date: string | Date | null): boolean {
  if (!date) {
    return false;
  }
  const inputDate = new Date(`${date}T12:00:00`);
  const localInputDate = stripTimeFromDate(inputDate);

  const now = new Date();
  const localStartOfWeek = stripTimeFromDate(startOfWeek(now, { weekStartsOn: 1 }));
  const localEndOfWeek = stripTimeFromDate(endOfWeek(now, { weekStartsOn: 1 }));
  
  return isWithinInterval(localInputDate, { start: localStartOfWeek, end: localEndOfWeek });
};

export function isInCurrentMonth(date: string | Date | null): boolean {
  if (!date) {
    return false;
  }
  
  const inputDate = new Date(`${date}T12:00:00`);

  const now = new Date();

  return (inputDate.getMonth() === now.getMonth()) && (inputDate.getFullYear() === now.getFullYear());
}
