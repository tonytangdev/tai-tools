import dayjs from "dayjs";
require('dayjs/locale/fr')

dayjs.locale('fr')
import { getFirstValidWeekdayOfPreviousMonth, getValidEndWeekdayOfCurrentWeek } from "../../../helpers/dates/dateUtils";

describe("getFirstValidWeekdayOfPreviousMonth", () => {
  test("should return 2023-01-02 Monday. First of previous month is a Sunday", () => {
    const firstWeekdayOfPreviousMonth = getFirstValidWeekdayOfPreviousMonth(dayjs("2023-02-01"));
    expect(firstWeekdayOfPreviousMonth.format("YYYY-MM-DD")).toBe("2023-01-02");
  });

  test("should return 2022-10-03 Monday. First of previous month is a Saturday", () => {
    const firstWeekdayOfPreviousMonth = getFirstValidWeekdayOfPreviousMonth(dayjs("2022-11-14"));
    expect(firstWeekdayOfPreviousMonth.format("YYYY-MM-DD")).toBe("2022-10-03");
  });

  test("should return 2023-05-01 Monday. First of previous month is a Monday", () => {
    const firstWeekdayOfPreviousMonth = getFirstValidWeekdayOfPreviousMonth(dayjs("2023-06-30"));
    expect(firstWeekdayOfPreviousMonth.format("YYYY-MM-DD")).toBe("2023-05-01");
  });

  test("should return 2023-02-01 Wednesday. First of previous month is a Wednesday", () => {
    const firstWeekdayOfPreviousMonth = getFirstValidWeekdayOfPreviousMonth(dayjs("2023-03-01"));
    expect(firstWeekdayOfPreviousMonth.format("YYYY-MM-DD")).toBe("2023-02-01");
  });

  test("should handle leap years correctly", () => {
    const firstWeekdayOfPreviousMonth = getFirstValidWeekdayOfPreviousMonth(dayjs("2020-03-01"));
    expect(firstWeekdayOfPreviousMonth.format("YYYY-MM-DD")).toBe("2020-02-03");
  });
});

describe('getValidEndWeekdayOfCurrentWeek', () => {
  test('should return 2023-06-30 Friday. End of current week is a Friday', () => {
    const validEndWeekdayOfCurrentWeek = getValidEndWeekdayOfCurrentWeek(dayjs('2023-06-30'));
    expect(validEndWeekdayOfCurrentWeek.format('YYYY-MM-DD')).toBe('2023-06-30');
  });
  test('should return 2023-03-03 Friday. End of current week is a Wednesday', () => {
    const validEndWeekdayOfCurrentWeek = getValidEndWeekdayOfCurrentWeek(dayjs('2023-03-01'));
    expect(validEndWeekdayOfCurrentWeek.format('YYYY-MM-DD')).toBe('2023-03-03');
  });
  test('should return 2023-02-03 Friday. End of current week is a Friday', () => {
    const validEndWeekdayOfCurrentWeek = getValidEndWeekdayOfCurrentWeek('2023-02-01');
    expect(validEndWeekdayOfCurrentWeek.format('YYYY-MM-DD')).toBe('2023-02-03');
  });
  test('should handle leap years correctly', () => {
    const validEndWeekdayOfCurrentWeek = getValidEndWeekdayOfCurrentWeek(dayjs('2020-03-02'));
    expect(validEndWeekdayOfCurrentWeek.format('YYYY-MM-DD')).toBe('2020-03-06');
  });
})
