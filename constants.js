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

export const Font = {
    QUICKSAND_BOLD: 'Quicksand-Bold',
    QUICKSAND_LIGHT: 'Quicksand-Light',
    QUICKSAND_REGULAR: 'Quicksand-Regular',
    QUICKSAND_MEDIUM: 'Quicksand-Medium',
    QUICKSAND_SEMIBOLD: 'Quicksand-SemiBold',
} 

export const Action = {
    UPDATE_WEATHER: "UPDATE_WEATHER",
    UPDATE_LOCATION: "UPDATE_LOCATION",
    SET_SCREEN: 'SET_SCREEN'
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