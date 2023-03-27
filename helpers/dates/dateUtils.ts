import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);

export function getFirstValidWeekdayOfPreviousMonth(
  date: Dayjs | number | Date
): dayjs.Dayjs {
  const today = dayjs(date);
  const firstDayOfPreviousMonth = today.subtract(1, "month").startOf("month");
  const firstDayOfPreviousMonthWeekday = firstDayOfPreviousMonth.weekday();

  if (firstDayOfPreviousMonthWeekday === 0) {
    // If the first day of the previous month is a Sunday, return the Monday
    return firstDayOfPreviousMonth.add(1, 'day');
  }

  if (firstDayOfPreviousMonthWeekday === 6) {
    // If the first day of the previous month is a Saturday, return the Monday
    return firstDayOfPreviousMonth.add(2, 'day');
  }

  // Otherwise, return the first day of the previous month
  return firstDayOfPreviousMonth;
}
