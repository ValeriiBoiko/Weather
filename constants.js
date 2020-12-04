export const ColorScheme = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const DarkTheme = {
  sunnyDay: '#f8a057',
  clearDay: '#5eb5c9',
  cloudyDay: '#738e97',
  night: '#293551',
  primary: '#5eb5c9',
  background: '#171717',
  text: '#eee',
  border: '#212121'
};

export const LightTheme = {
  sunnyDay: '#f8a057',
  clearDay: '#5eb5c9',
  cloudyDay: '#738e97',
  night: '#293551',
  primary: '#5eb5c9',
  background: '#fff',
  text: '#333',
  border: '#e7e7e8'
}

export const GeoSource = {
  GPS: 'GPS',
  IP: 'IP',
  STATIC: 'STATIC',
};

export const Font = {
  COMFORTAA_LIGHT: 'Comfortaa-Light',
  COMFORTAA_REGULAR: 'Comfortaa-Regular',
  COMFORTAA_MEDIUM: 'Comfortaa-Regular',
  COMFORTAA_SEMIBOLD: 'Comfortaa-SemiBold',
  COMFORTAA_BOLD: 'Comfortaa-Bold',
};

export const Action = {
  SET_WEATHER: 'SET_WEATHER',
  SET_LOCATION: 'SET_LOCATION',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_COLOR_SCHEME: 'SET_COLOR_SCHEME',
  SET_SCREEN: 'SET_SCREEN',
  SET_UNIT_SYSTEM: 'SET_UNIT_SYSTEM',
};

export const Images = {
  NIGHT: require('./assets/night.png'),
  SUNNY_DAY: require('./assets/sunny.png'),
  CLOUDY_DAY: require('./assets/cloudy.png'),
  RAINY_DAY: require('./assets/rainy.png'),
};

export const IconsMap = {
  '01d': {
    icon: 'sun',
    image: Images.SUNNY_DAY,
    color: LightTheme.sunnyDay,
  },
  '01n': {
    icon: 'moon',
    image: Images.NIGHT,
    color: LightTheme.night,
  },
  '02d': {
    icon: 'cloudy-day',
    image: Images.CLOUDY_DAY,
    color: LightTheme.clearDay,
  },
  '02n': {
    icon: 'cloudy-night',
    image: Images.NIGHT,
    color: LightTheme.night,
  },
  '03d': {
    icon: 'cloudy-day',
    image: Images.CLOUDY_DAY,
    color: LightTheme.clearDay,
  },
  '03n': {
    icon: 'cloudy-night',
    image: Images.NIGHT,
    color: LightTheme.night,
  },
  '04d': {
    icon: 'cloudy-day',
    image: Images.CLOUDY_DAY,
    color: LightTheme.clearDay,
  },
  '04n': {
    icon: 'cloudy-night',
    image: Images.NIGHT,
    color: LightTheme.night,
  },
  '09d': {
    icon: 'shower-day',
    image: Images.CLOUDY_DAY,
    color: LightTheme.clearDay,
  },
  '09n': {
    icon: 'shower-night',
    image: Images.NIGHT,
    color: LightTheme.night,
  },
  '10d': {
    icon: 'rainy-day',
    image: Images.RAINY_DAY,
    color: LightTheme.cloudyDay,
  },
  '10n': {
    icon: 'rainy-night',
    image: Images.NIGHT,
    color: LightTheme.night,
  },
  '11d': {
    icon: 'thunder-day',
    image: Images.RAINY_DAY,
    color: LightTheme.cloudyDay,
  },
  '11n': {
    icon: 'thunder-night',
    image: Images.NIGHT,
    color: LightTheme.night,
  },
  '13d': {
    icon: 'snowy-day',
    image: Images.CLOUDY_DAY,
    color: LightTheme.cloudyDay,
  },
  '13n': {
    icon: 'snowy-night',
    image: Images.NIGHT,
    color: LightTheme.night,
  },
  '50d': {
    icon: 'mist-day',
    image: Images.CLOUDY_DAY,
    color: LightTheme.cloudyDay,
  },
  '50n': {
    icon: 'mist-night',
    image: Images.NIGHT,
    color: LightTheme.night,
  },
};

export const Unit = {
  IMPERIAL: 'imperial',
  METRIC: 'metric',
};

export const Language = {
  EN: 'en',
  UA: 'ua',
};

export const Screen = {
  WEATHER_TODAY: 'screen.DailyForecast',
  WEEKLY_FORECAST: 'screen.WeeklyForecast',
  SETTINGS: 'screen.Settings'
}