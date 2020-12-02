import { Action, GeoSource } from './constants';
import { APIHelper } from './utils/api';
import Permission from './utils/Permission';
import RNLocation from 'react-native-location';

export const setWeatherAction = (payload) => ({
  type: Action.SET_WEATHER,
  payload: payload,
});

export const setUnitAction = (payload) => ({
  type: Action.SET_UNIT_SYSTEM,
  payload: payload,
});

export const setLanguageAction = (lang) => ({
  type: Action.SET_LANGUAGE,
  payload: lang,
});

export const setColorSchemeAction = (color) => ({
  type: Action.SET_COLOR_SCHEME,
  payload: color,
});

export const setLocationAction = (location, source) => ({
  type: Action.SET_LOCATION,
  payload: {
    location: {
      longitude: location.longitude,
      latitude: location.latitude,
    },
    locationSource: source,
  },
});

export const setScreenAction = (screen) => ({
  type: Action.SET_SCREEN,
  payload: screen,
});

export const setErrorAction = (error) => ({
  type: Action.SET_ERROR,
  payload: error,
});

export const setWeather = ({ latitude, longitude }, unit, lang) => {
  return async (dispatch) => {
    try {
      const weather = await APIHelper.fetchWeatherData(
        latitude,
        longitude,
        unit,
        lang,
      );
      dispatch(setWeatherAction(weather));
    } catch (error) {
      throw Error(
        `setWeather action threw the error: ${error}; Passed params: 
        ${JSON.stringify({ latitude, longitude, unit, lang })}`
      );
    }
  };
};

export const setLocation = (source, location = null) => {
  return async (dispatch, getState) => {
    switch (source) {
      case GeoSource.IP:
        location = await APIHelper.fetchIPData();
        break;

      case GeoSource.GPS:
        if (await Permission.parmissionGranted()) {
          location = await RNLocation.getLatestLocation({ timeout: 5000 });
        } else {
          if (await Permission.requestGeoPermission()) {
            location = await RNLocation.getLatestLocation({ timeout: 5000 });
          } else {
            location = await APIHelper.fetchIPData();
            source = GeoSource.IP;
          }
        }
        break;

      case GeoSource.STATIC:
        location = location === null ? getState().location : location;
    }

    location = !location ? getState().location : location;

    dispatch(setLocationAction(location, source));
  };
};
