import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Color, Font } from '../../../constants';
import Icon from '../../../ui/Icon/Icon';
import { common } from '../../../styles/common';

class Tab extends React.Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress} style={common.flex}>
                <View style={[styles.tab, this.props.style]} >
                    <Icon style={[this.props.defaultStyle, styles.icon]}
                        name={this.props.options.icon} size={35}
                        color={Color.DARK_BLUE} />
                    <Text style={styles.label}>{this.props.options.text}</Text>
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