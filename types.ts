import { Reducer } from "react";

// ----------------------------------------------
// Tai Time

export type DayType = {
    project: string;
    hours: number;
    minutes: number;
}

export type DaysType = {
    [key: string]: DayType
}

export type TaiTimeStateType = {
    start: string;
    end: string;
    days: DaysType
};

export const TAI_TIME_ACTIONS = {
    SET_START_DATE: "SET_START_DATE",
    SET_END_DATE: "SET_END_DATE",
    SET_PROJECT: "SET_PROJECT",
    SET_HOURS: "SET_HOURS",
    SET_MINUTES: "SET_MINUTES",
} as const

export type TaiTimeActionType<K extends keyof TaiTimePayloadTypes> = {
    type: K;
    payload: TaiTimePayloadTypes[K];
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

export type TaiTimePayloadTypes = {
    [TAI_TIME_ACTIONS.SET_START_DATE]: SetDatePayloadType;
    [TAI_TIME_ACTIONS.SET_END_DATE]: SetDatePayloadType;
    [TAI_TIME_ACTIONS.SET_PROJECT]: SetProjectPayloadType;
    [TAI_TIME_ACTIONS.SET_HOURS]: SetHoursPayloadType;
    [TAI_TIME_ACTIONS.SET_MINUTES]: SetMinutesPayloadType;
}

export type TaiTimeFormReducer = Reducer<TaiTimeStateType, TaiTimeActionType<keyof TaiTimePayloadTypes>>

export type WeekType = {
    [key: string]: {
        index: number;
        date: string;
        work: string;
        duration: string
    }
}
// ----------------------------------------------

// ----------------------------------------------
// Tai Home

export const TAI_HOME_ACTIONS = {
    SET_NUMBER_OF_PEOPLE: "SET_NUMBER_OF_PEOPLE",
    SET_FIRSTNAME: "SET_FIRSTNAME",
    SET_LASTNAME: "SET_LASTNAME",
    SET_GENDER: "SET_GENDER",
    SET_BIRTHDATE: "SET_BIRTHDATE",
    SET_BIRTHPLACE: "SET_BIRTHPLACE",
} as const;

export type TaiHomePayloadTypes = {
    [TAI_HOME_ACTIONS.SET_NUMBER_OF_PEOPLE]: number,
    [TAI_HOME_ACTIONS.SET_FIRSTNAME]: { index: number, firstname: string },
    [TAI_HOME_ACTIONS.SET_LASTNAME]: { index: number, lastname: string },
    [TAI_HOME_ACTIONS.SET_GENDER]: { index: number, gender: string },
    [TAI_HOME_ACTIONS.SET_BIRTHDATE]: { index: number, birthdate: Date },
    [TAI_HOME_ACTIONS.SET_BIRTHPLACE]: { index: number, birthplace: string },
}

export type TaiHomeActionType<K extends keyof TaiHomePayloadTypes> = {
    type: K;
    payload: TaiHomePayloadTypes[K];
};

export type TaiHomePeople = {
    firstname: string;
    lastname: string;
    gender: string;
    birthdate: Date;
    birthplace: string;
}

export type TaiHomeStateType = {
    people: TaiHomePeople[]
};

export type TaiHomeFormReducer = Reducer<TaiHomeStateType, TaiHomeActionType<keyof TaiHomePayloadTypes>>

// ----------------------------------------------