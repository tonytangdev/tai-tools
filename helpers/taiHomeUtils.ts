import { TaiHomeFormReducer, TaiHomePeople, TaiHomeStateType, TAI_HOME_ACTIONS } from "@/types";

export const taiHomeFormReducer: TaiHomeFormReducer = (state, action) => {
    switch (action.type) {
        case TAI_HOME_ACTIONS.SET_NUMBER_OF_PEOPLE:
            return updatePeople(state, action.payload as number);
        case TAI_HOME_ACTIONS.SET_FIRSTNAME:
            return updateInfo(state, (action.payload as { index: number }).index, "firstname", (action.payload as { firstname: string }).firstname);
        case TAI_HOME_ACTIONS.SET_LASTNAME:
            return updateInfo(state, (action.payload as { index: number }).index, "lastname", (action.payload as { lastname: string }).lastname);
        case TAI_HOME_ACTIONS.SET_GENDER:
            return updateInfo(state, (action.payload as { index: number }).index, "gender", (action.payload as { gender: string }).gender);
        case TAI_HOME_ACTIONS.SET_BIRTHDATE:
            return updateInfo(state, (action.payload as { index: number }).index, "birthdate", (action.payload as { birthdate: Date }).birthdate);
        default:
            return state;
    }
}
const updateInfo = <K extends keyof TaiHomePeople>(state: TaiHomeStateType, index: number, key: K, value: TaiHomePeople[K]) => {
    const newPeople = [...state.people];
    if (newPeople[index]) {
        newPeople[index][key] = value;
        return {
            ...state,
            people: newPeople
        };
    }
    return state;
}

const updatePeople = (state: TaiHomeStateType, numberOfPeople: number) => {
    const currentLength = state.people.length;
    const toAdd = currentLength - numberOfPeople;

    let newPeople = [...state.people];
    if (toAdd > 0) {
        // add new people
        for (let i = 0; i < toAdd; i++) {
            newPeople.push({
                firstname: "",
                lastname: "",
                gender: "",
                birthdate: new Date(),
            });
        }
    } else {
        // remove people
        for (let i = 0; i < toAdd; i++) {
            newPeople.pop();
        }
    }

    return {
        ...state,
        people: newPeople,
    }
}

export const defaultState = {
    people: [
        {
            firstname: "",
            lastname: "",
            gender: "male",
            birthdate: new Date(),
        }
    ]
}