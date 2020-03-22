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
        color: Color.BLACK,
        fontSize: widthDependedPixel(14),
        lineHeight: widthDependedPixel(14),
        fontFamily: Font.QUICKSAND_REGULAR
    }
}) 