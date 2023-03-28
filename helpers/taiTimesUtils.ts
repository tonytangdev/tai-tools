import { formatMinutes, getFirstValidWeekdayOfPreviousMonth, getValidEndWeekdayOfCurrentWeek } from "@/helpers/dates/dateUtils";
import dayjs from "dayjs";
import { ACTIONS, DaysType, FormReducer, SetHoursPayloadType, SetMinutesPayloadType, SetProjectPayloadType, StateType, WeekType } from "../types";


// reducer
export const formReducer: FormReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_START_DATE:
            const startDate = action.payload as string;
            return computePeriod(startDate);
        case ACTIONS.SET_END_DATE:
            const endDate = action.payload as string;
            return computePeriod(state.start, endDate);
        case ACTIONS.SET_PROJECT:
            const projectDetails = action.payload as SetProjectPayloadType;
            return {
                ...state,
                days: {
                    ...state.days,
                    [projectDetails.day]: {
                        ...state.days[projectDetails.day],
                        project: projectDetails.project,
                    }
                }
            };
        case ACTIONS.SET_HOURS:
            const hoursDetails = action.payload as SetHoursPayloadType;
            const hours = parseInt(hoursDetails.hours);
            return {
                ...state,
                days: {
                    ...state.days,
                    [hoursDetails.day]: {
                        ...state.days[hoursDetails.day],
                        hours: hours,
                    }
                }
            };
        case ACTIONS.SET_MINUTES:
            const minutesDetails = action.payload as SetMinutesPayloadType;
            const minutes = parseInt(minutesDetails.minutes);
            return {
                ...state,
                days: {
                    ...state.days,
                    [minutesDetails.day]: {
                        ...state.days[minutesDetails.day],
                        minutes: minutes,
                    }
                }
            };
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
 * //             hours: 8,
 * //             minutes: 0,
 * //         },
 * //         "2023-02-02": {
 * //             project: "",
 * //             hours: 8,
 * //             minutes: 0,
 * //         },
 * //         "2023-02-03": {
 * //             project: "",
 * //             hours: 8,
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
 * //             hours: 8,
 * //             minutes: 0,
 * //         },
 * //         "2023-02-02": {
 * //             project: "",
 * //             hours: 8,
 * //             minutes: 0,
 * //         },
 * //         "2023-02-03": {
 * //             project: "",
 * //             hours: 8,
 * //             minutes: 0,
 * //         },
 * //         "2023-02-04": {
 * //             project: "",
 * //             hours: 8,
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
            hours: 8,
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

export function computeTotalHours(days: DaysType) {
    let totalHours = 0;
    let totalMinutes = 0;
    for (const day in days) {
        totalHours += days[day].hours || 0;
        totalMinutes += days[day].minutes || 0;
    }
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
    return {
        hours: totalHours,
        minutes: totalMinutes,
    };
}

export function formatStateToSend(state: StateType) {
    const startingDate = dayjs(state.start).format("DD/MM");
    const endingDate = dayjs(state.end).format("DD/MM/YYYY");
    const totalDuration = computeTotalHours(state.days);
    const totalMinutes = formatMinutes(totalDuration.minutes);
    const week = Object.keys(state.days).reduce((acc, day) => {
        const dayIndex = dayjs(day).weekday();
        const dayDate = dayjs(day).format("DD/MM");
        const dayWork = state.days[day].project;
        const dayHours = state.days[day].hours;
        const dayMinutes = state.days[day].minutes;
        // format minutes
        const minutes = formatMinutes(dayMinutes);

        acc[dayIndex] = {
            index: dayIndex,
            date: dayDate,
            work: dayWork,
            duration: `${dayHours}H${minutes}`,
        };
        return acc;
    }, {} as WeekType);
    return {
        startingDate: startingDate,
        endingDate: endingDate,
        week: { totalDuration: `${totalDuration.hours}H${totalMinutes}`, ...week },
    };
}