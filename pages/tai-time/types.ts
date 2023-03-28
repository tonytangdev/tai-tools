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

export type PayloadTypes = {
    [ACTIONS.SET_START_DATE]: SetDatePayloadType;
    [ACTIONS.SET_END_DATE]: SetDatePayloadType;
    [ACTIONS.SET_PROJECT]: SetProjectPayloadType;
}

export type FormReducer = Reducer<StateType, ActionType<keyof PayloadTypes>>