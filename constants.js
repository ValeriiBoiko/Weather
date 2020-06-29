export const ColorScheme = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const Color = {
  ORANGE: '#f8a057',
  CYAN: '#5eb5c9',
  DIRTY_BLUE: '#738e97',
  TAB_BAR: '#e7e7e8',
  WHITE: '#fff',
  DARK_BLUE: '#293551',
  BLUE: '#5996f7',
  BLACK: '#333',
  light: {
    TAB_BAR: '#e7e7e8',
    SEPARATOR: '#e7e7e8',
    WHITE: '#f5f5f5',
    BLACK: '#333',
    CYAN: '#5eb5c9',
  },
  dark: {
    TAB_BAR: '#212121',
    SEPARATOR: '#333333',
    WHITE: '#171717',
    BLACK: '#eee',
    CYAN: '#5eb5c9',
  },
};

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
    color: Color.ORANGE,
  },
  '01n': {
    icon: 'moon',
    image: Images.NIGHT,
    color: Color.DARK_BLUE,
  },
  '02d': {
    icon: 'cloudy-day',
    image: Images.CLOUDY_DAY,
    color: Color.CYAN,
  },
  '02n': {
    icon: 'cloudy-night',
    image: Images.NIGHT,
    color: Color.DARK_BLUE,
  },
  '03d': {
    icon: 'cloudy-day',
    image: Images.CLOUDY_DAY,
    color: Color.CYAN,
  },
  '03n': {
    icon: 'cloudy-night',
    image: Images.NIGHT,
    color: Color.DARK_BLUE,
  },
  '04d': {
    icon: 'cloudy-day',
    image: Images.CLOUDY_DAY,
    color: Color.CYAN,
  },
  '04n': {
    icon: 'cloudy-night',
    image: Images.NIGHT,
    color: Color.DARK_BLUE,
  },
  '09d': {
    icon: 'shower-day',
    image: Images.CLOUDY_DAY,
    color: Color.CYAN,
  },
  '09n': {
    icon: 'shower-night',
    image: Images.NIGHT,
    color: Color.DARK_BLUE,
  },
  '10d': {
    icon: 'rainy-day',
    image: Images.RAINY_DAY,
    color: Color.DIRTY_BLUE,
  },
  '10n': {
    icon: 'rainy-night',
    image: Images.NIGHT,
    color: Color.DARK_BLUE,
  },
  '11d': {
    icon: 'thunder-day',
    image: Images.RAINY_DAY,
    color: Color.DIRTY_BLUE,
  },
  '11n': {
    icon: 'thunder-night',
    image: Images.NIGHT,
    color: Color.DARK_BLUE,
  },
  '13d': {
    icon: 'snowy-day',
    image: Images.CLOUDY_DAY,
    color: Color.DIRTY_BLUE,
  },
  '13n': {
    icon: 'snowy-night',
    image: Images.NIGHT,
    color: Color.DARK_BLUE,
  },
  '50d': {
    icon: 'mist-day',
    image: Images.CLOUDY_DAY,
    color: Color.DIRTY_BLUE,
  },
  '50n': {
    icon: 'mist-night',
    image: Images.NIGHT,
    color: Color.DARK_BLUE,
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
