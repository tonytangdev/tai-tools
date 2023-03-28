import { getFirstValidWeekdayOfPreviousMonth, getValidEndWeekdayOfCurrentWeek } from "@/helpers/dates/dateUtils";
import dayjs from "dayjs";

export type DayType = {
    project: string;
    hours: number;
    minutes: number;
}

export type DaysType = {
    [key: string]: DayType
}

export type StateType = {
    start: string;
    end: string;
    days: DaysType
};

export type ActionType<T> = { type: string; payload: T };

// reducer
export const formReducer = <T>(state: StateType, action: ActionType<T>) => {
    return state;
};

// default state
export const defaultState = (): StateType => {
    const start = getFirstValidWeekdayOfPreviousMonth(dayjs())
    const end = getValidEndWeekdayOfCurrentWeek(start)

    // get days between start and end
    let days: DaysType = {}
    let currentDate = start
    while (currentDate.isBefore(end)) {
        days[currentDate.format("YYYY-MM-DD")] = {
            project: "",
            hours: 0,
            minutes: 0,
        }
        currentDate = currentDate.add(1, "day")
    }

    return {
        start: start.format("YYYY-MM-DD"),
        end: end.format("YYYY-MM-DD"),
        days: days,
    }
};