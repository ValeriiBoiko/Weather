import { Platform } from "react-native";

export const getDayName = (index, lang = "en") => {
    const days = {
        "en": ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        "ru": ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    };

    return days[lang][index];
}

export const titleCase = (str) => {
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

export const isAndroid = Platform.OS === 'android'