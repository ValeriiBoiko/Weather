import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from '../../../ui/Icon/Icon';
import { Color, Font } from '../../../constants';
import { widthDependedPixel, heightPercentageToDP } from '../../../utils/units';

class Item extends React.Component {
    render() {
        return (
            <View style={[
                this.props.style,
                styles.container
            ]}>
                <Icon name={this.props.name} color={this.props.color} size={this.props.size} />
                <View style={styles.content}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.value}>{this.props.value}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        
    },
    title: {
        fontSize: widthDependedPixel(20),
        lineHeight: widthDependedPixel(25),
        paddingBottom: widthDependedPixel(5),
        color: '#999',
        fontFamily: Font.QUICKSAND_LIGHT
    },
    value: {
        fontSize: widthDependedPixel(16),
        lineHeight: widthDependedPixel(20),
        color: '#888',
        fontFamily: Font.QUICKSAND_SEMIBOLD
    }
});

export default Item;