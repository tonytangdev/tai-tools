import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);

/**
 * Returns the first valid weekday of the previous month.
 * If the first day of the previous month is a Sunday, return the Monday.
 * If the first day of the previous month is a Saturday, return the Monday.
 * Otherwise, return the first day of the previous month.
 * @param date The date to get the first valid weekday of the previous month for.
 * @returns The first valid weekday of the previous month.
 * @example
 * getFirstValidWeekdayOfPreviousMonth(dayjs("2023-02-01"));
 * // Returns dayjs("2023-01-02")
 * @example
 * getFirstValidWeekdayOfPreviousMonth(dayjs("2022-11-14"));
 * // Returns dayjs("2022-10-03")
 * @example
 * getFirstValidWeekdayOfPreviousMonth(dayjs("2023-06-30"));
 * // Returns dayjs("2023-05-01")
 * @example
 * getFirstValidWeekdayOfPreviousMonth(dayjs("2023-03-01"));
 * // Returns dayjs("2023-02-01")
 * @example
 * getFirstValidWeekdayOfPreviousMonth(dayjs("2020-03-01"));
 * // Returns dayjs("2020-02-03")
 * 
 */
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
