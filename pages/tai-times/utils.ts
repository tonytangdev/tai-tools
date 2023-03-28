import { getFirstValidWeekdayOfPreviousMonth, getValidEndWeekdayOfCurrentWeek } from "@/helpers/dates/dateUtils";
import dayjs from "dayjs";
import { ACTIONS, DaysType, FormReducer, StateType } from "./types";


// reducer
export const formReducer: FormReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_START_DATE:
            return computePeriod(action.payload);
        default:
            return state;
    };
}

// default state
export const defaultState = (): StateType => {
    const start = getFirstValidWeekdayOfPreviousMonth(dayjs())
    return computePeriod(start);
};

/**
 * Computes the period from the start date.
 * 
 * @param start The start date.
 * @returns The period.
 * @example
 * computePeriod(dayjs("2023-02-01"));
 * // Returns {
 * //     start: "2023-01-02",
 * //     end: "2023-02-03",
 * //     days: {
 * //         "2023-01-02": {
 * //             project: "",
 * //             hours: 0,
 * //             minutes: 0,
 * //         }
 * //     }
 * // }
 */
export const computePeriod = (start: dayjs.Dayjs | number | string) => {
    const startDate = dayjs(start);
    const end = getValidEndWeekdayOfCurrentWeek(startDate);

    // get days between start and end
    let days: DaysType = {};
    let currentDate = dayjs(startDate);
    while (currentDate.isBefore(end) || currentDate.isSame(end)) {
        days[currentDate.format("YYYY-MM-DD")] = {
            project: "",
            hours: 0,
            minutes: 0,
        };
        currentDate = currentDate.add(1, "day");
    }

    return {
        start: startDate.format("YYYY-MM-DD"),
        end: end.format("YYYY-MM-DD"),
        days: days,
    };
}
