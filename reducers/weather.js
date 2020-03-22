import { Action, Color, IconsMap, Images } from "../constants";

const initialState = {
    data: {
            sunrise: 'n/a',
            sunset: 'n/a',
            city: 'n/a',
            list: [
                {
                    dt: new Date(),
                    clouds: 'n/a',
                    temp: 'n/a',
                    feelsLike: 'n/a',
                    humidity: 'n/a',
                    description: 'n/a',
                    title: 'cloudy',
                    wind: 'n/a',
                    icon: '01d'
                }
            ]
    },
    displayTheme: {
        backgroundColor: Color.CYAN,
        backgroundImage: Images.CLOUDY_DAY
    }
}

export default (state = initialState, action) => {
    if (action.type === Action.UPDATE_WEATHER) {        
        const currentWeather = action.payload.list[0];
        action.payload.sunrise *= 1000;
        action.payload.sunset *= 1000;

        return {
            ...state,
            data: action.payload,
            displayTheme: {
                backgroundColor: IconsMap[currentWeather.icon].color,
                backgroundImage: IconsMap[currentWeather.icon].image
            }
        };
    }

    return state;
}