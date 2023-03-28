import { Reducer } from "react";

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

export const ACTIONS = {
    SET_START_DATE: "SET_START_DATE",
    SET_END_DATE: "SET_END_DATE",
    SET_PROJECT: "SET_PROJECT",
    SET_HOURS: "SET_HOURS",
    SET_MINUTES: "SET_MINUTES",
} as const

export type ActionType<K extends keyof PayloadTypes> = {
    type: K;
    payload: PayloadTypes[K];
};

export type SetDatePayloadType = string;

export type SetProjectPayloadType = {
    day: string;
    project: string;
}

export type SetHoursPayloadType = {
    day: string;
    hours: string;
}

export type SetMinutesPayloadType = {
    day: string;
    minutes: string;
}

export type PayloadTypes = {
    [ACTIONS.SET_START_DATE]: SetDatePayloadType;
    [ACTIONS.SET_END_DATE]: SetDatePayloadType;
    [ACTIONS.SET_PROJECT]: SetProjectPayloadType;
    [ACTIONS.SET_HOURS]: SetHoursPayloadType;
    [ACTIONS.SET_MINUTES]: SetMinutesPayloadType;
}

export type FormReducer = Reducer<StateType, ActionType<keyof PayloadTypes>>