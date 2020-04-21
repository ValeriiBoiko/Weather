import { Action, GeoSource } from "./constants"
import { APIHelper } from "./utils/api";
import Permission from "./utils/Permission";
import RNLocation from 'react-native-location';

export const setWeatherAction = payload => ({
    type: Action.SET_WEATHER,
    payload: payload
});

export const setUnitAction = payload => ({
    type: Action.SET_UNIT_SYSTEM,
    payload: payload
});

export const setLanguageAction = lang => ({
    type: Action.SET_LANGUAGE,
    payload: lang
});

export const setColorSchemeAction = color => ({
    type: Action.SET_COLOR_SCHEME,
    payload: color
});

export const setLocationAction = (location, source) => ({
    type: Action.SET_LOCATION,
    payload: {
        location: {
            longitude: location.longitude,
            latitude: location.latitude
        },
        locationSource: source
    }
});

export const setErrorAction = error => ({
    type: Action.SET_ERROR,
    payload: error
});

export const setWeather = ({latitude, longitude}) => {
    return async (dispatch, getState) => {
        try {
            const { unitSystem, lang } = getState();
            const weather = await APIHelper.fetchWeatherData(latitude, longitude, unitSystem, lang);
            dispatch(setWeatherAction(weather));
        } catch (error) {
            dispatch(setErrorAction(error))
        }
    } 
};

export const setLocation = (source, location = null) => {
    return async (dispatch, getState) => {
        switch (source) {
            case GeoSource.IP :
                location = await APIHelper.fetchIPData();
                break;

            case GeoSource.GPS :
                if (Permission.parmissionGranted()) {
                    location = await RNLocation.getLatestLocation({ timeout: 5000 });
                }
                break;
            case GeoSource.STATIC :
                location = location === null ? getState().location : location; 
        }

        dispatch(setLocationAction(location, source))
    }
};