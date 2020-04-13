export const Color = {
    ORANGE: "#f8a057",
    CYAN: "#5eb5c9",
    DIRTY_BLUE: "#738e97",
    TAB_BAR: "#e7e7e8",
    WHITE: "#fff",
    DARK_BLUE: "#293551",
    BLUE: "#5996f7",
    BLACK: "#333"
}

export const GeoSource = {
    GPS: 'GPS',
    IP: 'IP',
    STATIC: 'STATIC',
}

export const Font = {
    QUICKSAND_LIGHT: 'Comfortaa-Light',
    QUICKSAND_REGULAR: 'Comfortaa-Regular',
    QUICKSAND_MEDIUM: 'Comfortaa-Regular',
    QUICKSAND_SEMIBOLD: 'Comfortaa-SemiBold',
    QUICKSAND_BOLD: 'Comfortaa-Bold',
} 

export const Action = {
    UPDATE_WEATHER: "UPDATE_WEATHER",
    SET_WEATHER: "SET_WEATHER",
    UPDATE_LOCATION: "UPDATE_LOCATION",
    SET_LOCATION: "SET_LOCATION",
    SET_SCREEN: 'SET_SCREEN',
    UPDATE_LOCATION_USAGE: 'UPDATE_LOCATION_USAGE',
    UPDATE_UNIT_SYSTEM: 'UPDATE_UNIT_SYSTEM',
    UPDATE_LOCATION_SOURCE: 'UPDATE_LOCATION_SOURCE',
}

export const Images = {
    NIGHT: require("./assets/night.png"),
    SUNNY_DAY: require("./assets/sunny.png"),
    CLOUDY_DAY: require("./assets/cloudy.png"),
    RAINY_DAY: require("./assets/rainy.png"),
}

export const IconsMap = {
    "01d": {
        icon: "sun",
        image: Images.SUNNY_DAY,
        color: Color.ORANGE
    },
    "01n": {
        icon: "moon",
        image: Images.NIGHT,
        color: Color.DARK_BLUE
    },
    "02d": {
        icon: "cloudy-day",
        image: Images.CLOUDY_DAY,
        color: Color.CYAN
    },
    "02n": {
        icon: "cloudy-night",
        image: Images.NIGHT,
        color: Color.DARK_BLUE
    },
    "03d": {
        icon: "cloudy-day",
        image: Images.CLOUDY_DAY,
        color: Color.CYAN
    },
    "03n": {
        icon: "cloudy-night",
        image: Images.NIGHT,
        color: Color.DARK_BLUE
    },
    "04d": {
        icon: "cloudy-day",
        image: Images.CLOUDY_DAY,
        color: Color.CYAN
    },
    "04n": {
        icon: "cloudy-night",
        image: Images.NIGHT,
        color: Color.DARK_BLUE
    },
    "09d": {
        icon: "shower-day",
        image: Images.CLOUDY_DAY,
        color: Color.CYAN
    },
    "09n": {
        icon: "shower-night",
        image: Images.NIGHT,
        color: Color.DARK_BLUE
    },
    "10d": {
        icon: "rainy-day",
        image: Images.RAINY_DAY,
        color: Color.DIRTY_BLUE
    },
    "10n": {
        icon: "rainy-night",
        image: Images.NIGHT,
        color: Color.DARK_BLUE
    },
    "11d": {
        icon: "thunder-day",
        image: Images.RAINY_DAY,
        color: Color.DIRTY_BLUE
    },
    "11n": {
        icon: "thunder-night",
        image: Images.NIGHT,
        color: Color.DARK_BLUE
    },
    "13d": {
        icon: "snowy-day",
        image: Images.CLOUDY_DAY,
        color: Color.DIRTY_BLUE
    },
    "13n": {
        icon: "snowy-night",
        image: Images.NIGHT,
        color: Color.DARK_BLUE
    },
    "50d": {
        icon: "mist-day",
        image: Images.CLOUDY_DAY,
        color: Color.DIRTY_BLUE
    },
    "50n": {
        icon: "mist-night",
        image: Images.NIGHT,
        color: Color.DARK_BLUE
    },
}