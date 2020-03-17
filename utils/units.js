import { Dimensions } from "react-native";

const dimensions = Dimensions.get('window');
const basicWidth = 375;
const basicHeight = 812;

export function widthPercentageToDP (width, layoutWidth = dimensions.width) {
    const ratio = basicWidth / layoutWidth;
    return (width / 100) * basicWidth / ratio;
}

export function heightPercentageToDP (height, layoutHeight = dimensions.height) { 
    const ratio = basicHeight / layoutHeight;
    return (height / 100) * basicHeight / ratio;
}

export function heightDependedPixel (pixel) {
    return dimensions.height / basicHeight * pixel;
}

export function widthDependedPixel (pixel) {
    return dimensions.width / basicWidth * pixel;
}