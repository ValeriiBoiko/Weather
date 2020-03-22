import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from '../../ui/Icon/Icon';
import { Color, Font } from '../../constants';
import { common } from '../../styles/common';

class DailyShortForecast extends React.Component {
    render () {
        return (
            <View style={[this.props.style]}>
                <Icon style={{
                    lineHeight: 55
                }} name="cloud-night" size={55} color={Color.DARK_BLUE} />
                <Text style={styles.day}>Sun</Text>
                <Text style={styles.temp}>12°/22°</Text>
                <Text style={styles.title}>Partly cloudy</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    day: {
        ...common.regularText,
        paddingLeft: '3%'
    },
    temp: {
        ...common.regularText,
        fontFamily: Font.QUICKSAND_SEMIBOLD,
        paddingHorizontal: '8%'
    },
    title: {
        ...common.regularText,
        flex: 1,
        flexWrap: 'wrap'
    }
})

export default DailyShortForecast;