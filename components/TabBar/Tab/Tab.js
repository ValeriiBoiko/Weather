import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Color, Font } from '../../../constants';
import Icon from '../../../ui/Icon/Icon';
import { common } from '../../../styles/common';
import { heightDependedPixel } from '../../../utils/units';

class Tab extends React.Component {
    render() {
        let iconStyle = {};
        let labelStyle = {};

        if (this.props.currentScreen === this.props.component 
            && this.props.options.selectedIconColor) {
            iconStyle.color = this.props.options.selectedIconColor;
            labelStyle.color = this.props.options.selectedIconColor;
        }

        return (
            <TouchableHighlight onPress={this.props.onPress} style={common.flex}>
                <View style={[styles.tab, this.props.style]} >
                    <Icon style={[this.props.defaultStyle, styles.icon, iconStyle]}
                        name={this.props.options.icon} size={35}
                        color={Color.DARK_BLUE} />
                    <Text style={[styles.label, labelStyle]}>{this.props.options.text}</Text>
                </View>
            </TouchableHighlight>
        )
    }
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