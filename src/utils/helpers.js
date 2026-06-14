import { differenceInDays, parseISO, format, isToday, isTomorrow, addDays } from 'date-fns';

export function daysUntil(dateStr) {
  return differenceInDays(parseISO(dateStr), new Date());
}

export function formatDate(dateStr) {
  return format(parseISO(dateStr), 'MMM d');
}

export function formatDateFull(dateStr) {
  return format(parseISO(dateStr), 'EEEE, MMM d');
}

export function getDayLabel(dateStr) {
  const d = parseISO(dateStr);
  if (isToday(d)) return 'Today';
  if (isTomorrow(d)) return 'Tomorrow';
  return format(d, 'EEEE, MMM d');
}

export function urgencyClass(days) {
  if (days <= 10) return 'urgent';
  if (days <= 21) return 'soon';
  return 'ok';
}

export function urgencyColor(days) {
  if (days <= 10) return { bg: '#FEE2E2', text: '#991B1B' };
  if (days <= 21) return { bg: '#FEF3C7', text: '#92400E' };
  return { bg: '#D1FAE5', text: '#065F46' };
}

export function minutesToHours(min) {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function difficultyStyle(d) {
  if (d === 'Hard') return { bg: '#FEE2E2', text: '#991B1B' };
  if (d === 'Medium') return { bg: '#FEF3C7', text: '#92400E' };
  return { bg: '#D1FAE5', text: '#065F46' };
}

export function getWeekDates() {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = addDays(today, i - 1);
    return format(d, 'yyyy-MM-dd');
  });
}
