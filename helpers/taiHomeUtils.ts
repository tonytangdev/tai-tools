import { Address, TaiHomeFormReducer, TaiHomePeople, TaiHomeStateType, TAI_HOME_ACTIONS } from "@/types";
import dayjs from "dayjs";

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
        case TAI_HOME_ACTIONS.SET_BIRTHPLACE:
            return updateInfo(state, (action.payload as { index: number }).index, "birthplace", (action.payload as { birthplace: string }).birthplace);
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
    const toAdd = numberOfPeople - currentLength;

    let newPeople = [...state.people];
    if (toAdd > 0) {
        // add new people
        for (let i = 0; i < toAdd; i++) {
            newPeople.push({
                firstname: "",
                lastname: "",
                gender: "",
                birthdate: new Date(),
                birthplace: "",
            });
        }
    } else {
        // remove people
        for (let i = 0; i > toAdd; i--) {
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
            birthplace: "",
        }
    ]
}

export const HOUSES = {
    EP: "12 rue Eugène Pottier",
    JJ: "1 rue Jean Jacaques Rousseau",
} as const;

export const formatTaiHomeData = (address: Address<keyof typeof HOUSES>, monthlyPrice: number, charges: number, numberOfKeys: number, date: string, startDate: Date, endDate: Date, people: TaiHomePeople[]) => {
    /**
     * Formatted values looks like this:
     * {
      "house": "EP",
      "monthlyRent": 332,
      "charges": 4342,
      "keysAmount": 2,
      "revisionDate": "01/01",
      "beginningDate": "05/04/2023",
      "endingDate": "31/03/2024",
      "people": [
        {
          "firstname": "dsfgsetg",
          "lastname": "sedrtsrth",
          "birthday": "05/04/2023",
          "birthPlace": "sdfghsertgh",
          "isMale": false
        }
      ]
    }
     */

    const house = Object.keys(HOUSES).find(key => HOUSES[key as keyof typeof HOUSES] === address);
    const beginningDate = dayjs(startDate).format("DD/MM/YYYY");
    const endingDate = dayjs(endDate).format("DD/MM/YYYY");

    const formattedPeople = people.map(person => {
        return {
            firstname: person.firstname,
            lastname: person.lastname,
            birthday: dayjs(person.birthdate).format("DD/MM/YYYY"),
            birthPlace: person.birthplace,
            isMale: person.gender === "male"
        }
    })

    return {
        house,
        monthlyRent: monthlyPrice,
        charges,
        keysAmount: numberOfKeys,
        revisionDate: date,
        beginningDate,
        endingDate,
        people: formattedPeople,
    }

}
