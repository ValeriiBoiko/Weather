import { Action } from "../constants";

const initialState = {
    city: null,
    lng: null,
    lat: null
}

export default (state = initialState, action) => {
    if (action.type === Action.UPDATE_LOCATION) {
        return {
            ...state,
            data: action.payload
        };
    }

    return state;
}