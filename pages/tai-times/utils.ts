import { getFirstValidWeekdayOfPreviousMonth, getValidEndWeekdayOfCurrentWeek } from "@/helpers/dates/dateUtils";
import dayjs from "dayjs";
import { ACTIONS, DaysType, FormReducer, StateType } from "./types";


// reducer
export const formReducer: FormReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_START_DATE:
            return computePeriod(action.payload);
        case ACTIONS.SET_END_DATE:
            return computePeriod(state.start, action.payload);
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
 * Compute period
 * @param start Start date
 * @param end End date
 * @returns Period
 * @example
 * computePeriod(dayjs("2023-02-01"));
 * // {
 * //     start: "2023-02-01",
 * //     end: "2023-02-03",
 * //     days: {
 * //         "2023-02-01": {
 * //             project: "",
 * //             hours: 0,
 * //             minutes: 0,
 * //         },
 * //         "2023-02-02": {
 * //             project: "",
 * //             hours: 0,
 * //             minutes: 0,
 * //         },
 * //         "2023-02-03": {
 * //             project: "",
 * //             hours: 0,
 * //             minutes: 0,
 * //         },
 * //     }
 * // }
 * 
 * computePeriod(dayjs("2023-02-01"), dayjs("2023-02-04"));
 * // {
 * //     start: "2023-02-01",
 * //     end: "2023-02-04",
 * //     days: {
 * //         "2023-02-01": {
 * //             project: "",
 * //             hours: 0,
 * //             minutes: 0,
 * //         },
 * //         "2023-02-02": {
 * //             project: "",
 * //             hours: 0,
 * //             minutes: 0,
 * //         },
 * //         "2023-02-03": {
 * //             project: "",
 * //             hours: 0,
 * //             minutes: 0,
 * //         },
 * //         "2023-02-04": {
 * //             project: "",
 * //             hours: 0,
 * //             minutes: 0,
 * //         },
 * //     }
 * // }
 */
export const computePeriod = (start: dayjs.Dayjs | number | string, end?: dayjs.Dayjs | number | string) => {
    const startDate = dayjs(start);
    const endDate = end ? dayjs(end) : getValidEndWeekdayOfCurrentWeek(startDate);

    // get days between start and end
    let days: DaysType = {};
    let currentDate = dayjs(startDate);
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
        days[currentDate.format("YYYY-MM-DD")] = {
            project: "",
            hours: 0,
            minutes: 0,
        };
        currentDate = currentDate.add(1, "day");
    }

    return {
        start: startDate.format("YYYY-MM-DD"),
        end: endDate.format("YYYY-MM-DD"),
        days: days,
    };
}
