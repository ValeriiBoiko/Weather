import { StyleSheet } from "react-native";
import { Color, Font } from "../constants";
import { widthDependedPixel } from "../utils/units";

export const common = StyleSheet.create({
    flex: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
    },
    centeredRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    regularText: {
        fontSize: widthDependedPixel(14),
        lineHeight: widthDependedPixel(18),
        fontFamily: Font.COMFORTAA_REGULAR
    },
    largerText: {
        fontSize: widthDependedPixel(16),
        lineHeight: widthDependedPixel(20),
        fontFamily: Font.COMFORTAA_REGULAR
    }
}) 