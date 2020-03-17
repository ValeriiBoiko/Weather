import { Action, Color, IconsMap, Images } from "../constants";

const initialState = {
    currentScreen: null,
    displayTheme: {
        backgroundColor: Color.CYAN,
        backgroundImage: Images.CLOUDY_DAY
    }
}

export default (state = initialState, action) => {
    if (action.type === Action.SET_SCREEN) {
        return {
            ...state,
            currentScreen: action.screenComponent
        }
    }

    return state;
}