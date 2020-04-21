import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Color, Font } from '../../../constants';
import Icon from '../../../ui/Icon/Icon';
import { common } from '../../../styles/common';
import { heightDependedPixel } from '../../../utils/units';
import Touchable from '../../../ui/Touchable';
import { connect } from 'react-redux';

function Tab(props) {
    const styles = getStyles(props);
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
                    name={props.options.icon} size={35} />
                <Text style={[styles.label, labelStyle]}>{props.options.text}</Text>
            </View>
        </Touchable>
    )

}

const getStyles = (props) => (
    StyleSheet.create({
        tab: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        label: {
            lineHeight: 12,
            fontSize: 12,
            color: Color[props.colorScheme].BLACK
        },
        icon: {
            marginBottom: -4,
            fontSize: heightDependedPixel(35),
            lineHeight: 35,
            color: Color[props.colorScheme].BLACK
        }
    })
)

Tab.defaultProps = {
    defaultStyle: {
        fontFamily: Font.COMFORTAA_BOLD,
        fontSize: 12
    }
};

const mapStateToProps = (state) => ({
    colorScheme: state.colorScheme
})

export default connect(mapStateToProps)(Tab);