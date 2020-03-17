import { Action, Color, IconsMap, Images } from "../constants";

const initialState = {
    data: {
            sunrise: new Date(),
            sunset: new Date(),
            city: 'San Francisco',
            list: [
                {
                    dt: new Date(),
                    clouds: '50',
                    temp: '17',
                    feelsLike: '16',
                    humidity: '70',
                    description: 'Broken Clouds',
                    title: 'cloudy',
                    wind: 9,
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