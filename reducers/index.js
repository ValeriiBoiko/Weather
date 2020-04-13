import { Action, Color, IconsMap, Images, GeoSource } from "../constants";

const initialState = {
    city: 'n/a',
    location: null,
    useStaticLocation: false,
    locationSource: GeoSource.IP,
    unitSystem: 'imperial',
    weather: {
        sunrise: 'n/a',
        sunset: 'n/a',
        city: 'n/a',
        today: {
            dt: new Date(),
            clouds: 'n/a',
            temp: 'n/a',
            feelsLike: 'n/a',
            humidity: 'n/a',
            description: 'n/a',
            title: 'cloudy',
            wind: 'n/a',
            icon: '01d'
        },
        week: {}
    },
    currentScreen: null, 
    displayTheme: {
        backgroundColor: Color.CYAN,
        backgroundImage: Images.CLOUDY_DAY
    },
    lang: 'en'
}

export default (state = initialState, action) => {

    switch(action.type) {
        case Action.UPDATE_WEATHER :
            return {
                ...state,
                weather: action.payload,
                displayTheme: {
                    backgroundColor: IconsMap[action.payload.today.icon].color,
                    backgroundImage: IconsMap[action.payload.today.icon].image
                }
            };
        case Action.UPDATE_LOCATION :
            return {
                ...state,
                location: action.payload
            };
        case Action.SET_SCREEN :
            return {
                ...state,
                currentScreen: action.payload
            }
        case Action.UPDATE_LOCATION_USAGE :
            return {
                ...state,
                useStaticLocation: action.payload
            }
        case Action.UPDATE_UNIT_SYSTEM :
            return {
                ...state,
                unitSystem: action.payload
            }
        case Action.UPDATE_LOCATION_SOURCE :
            return {
                ...state,
                locationSource: action.payload
            }
        case Action.SET_LOCATION :
            return {
                ...state,
                ...action.payload
            }
    }

    return state;
}