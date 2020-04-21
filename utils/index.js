import { Platform } from "react-native";

export const titleCase = (str) => {
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

export const isAndroid = Platform.OS === 'android'