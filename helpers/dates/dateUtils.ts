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
  date: string | Dayjs | number | Date
): dayjs.Dayjs {
  const currentDate = dayjs(date);
  const firstDayOfPreviousMonth = currentDate.subtract(1, "month").startOf("month");
  const firstDayOfPreviousMonthWeekday = firstDayOfPreviousMonth.weekday();

  console.log({ firstDayOfPreviousMonthWeekday });

  if (firstDayOfPreviousMonthWeekday === 6) {
    // If the first day of the previous month is a Sunday, return the Monday
    return firstDayOfPreviousMonth.add(1, 'day');
  }

  if (firstDayOfPreviousMonthWeekday === 5) {
    // If the first day of the previous month is a Saturday, return the Monday
    return firstDayOfPreviousMonth.add(2, 'day');
  }

  // Otherwise, return the first day of the previous month
  return firstDayOfPreviousMonth;
}

/**
 *  Returns the last valid weekday of the current week.
 * If the end day of the current week is a Sunday, return the previous Friday.
 * If the end day of the current week is a Saturday, return the previous endOfMonth.
 * Otherwise, return the endOfMonth.
 * @param date The date to get the last valid weekday of the current week for.
 * @returns The last valid weekday of the current week.
 * @example
 * getValidEndWeekdayOfCurrentWeek(dayjs("2023-02-01"));
 * // Returns dayjs("2023-02-03")
 * @example
 * getValidEndWeekdayOfCurrentWeek(dayjs("2022-11-14"));
 * // Returns dayjs("2022-11-18")
 * @example
 * getValidEndWeekdayOfCurrentWeek(dayjs("2023-06-30"));
 * // Returns dayjs("2023-06-30")
 */
export function getValidEndWeekdayOfCurrentWeek(date: string | Dayjs | number | Date) {
  const currentDate = dayjs(date);

  // get friday of the week
  const friday = currentDate.weekday(4);

  console.log("friday", friday.format("YYYY-MM-DD"));

  // get end of month
  const endOfMonth = currentDate.endOf("month");

  if (!friday.isAfter(endOfMonth)) {
    return friday;
  }

  // If the end day of the current week is a Sunday, return the previous Friday
  if (endOfMonth.weekday() === 0) {
    return endOfMonth.subtract(2, 'day');
  }

  // If the end day of the current week is a Saturday, return the previous endOfMonth
  if (endOfMonth.weekday() === 6) {
    return endOfMonth.subtract(1, 'day');
  }

  return endOfMonth;

}