import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Color, Font } from '../../../constants';
import Icon from '../../../ui/Icon/Icon';
import { common } from '../../../styles/common';
import { heightDependedPixel } from '../../../utils/units';
import Touchable from '../../../ui/Touchable';

function Tab(props) {
    let iconStyle = {};
    let labelStyle = {};

    if (props.active && props.options.selectedIconColor) {
        iconStyle.color = props.options.selectedIconColor;
        labelStyle.color = props.options.selectedIconColor;
    }

    return (
        <Touchable onPress={props.onPress} style={common.flex}>
            <View style={[styles.tab, props.style]} >
                <Icon style={[props.defaultStyle, styles.icon, iconStyle]}
                    name={props.options.icon} size={35}
                    color={Color.DARK_BLUE} />
                <Text style={[styles.label, labelStyle]}>{props.options.text}</Text>
            </View>
        </Touchable>
    )

}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        lineHeight: 12,
        fontSize: 12
    },
    icon: {
        marginBottom: -4,
        fontSize: heightDependedPixel(35),
        lineHeight: 35,
    }
});

Tab.defaultProps = {
    defaultStyle: {
        fontFamily: Font.QUICKSAND_BOLD,
        color: '#000',
        fontSize: 12
    }
};

export default Tab;