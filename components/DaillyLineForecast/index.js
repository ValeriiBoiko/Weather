import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from '../../ui/Icon/Icon';
import { Color, Font, IconsMap } from '../../constants';
import { common } from '../../styles/common';
import { widthPercentageToDP, widthDependedPixel } from '../../utils/units';
import { titleCase } from '../../utils';

class DailyShortForecast extends React.Component {
    render () {
        let data = this.props.data;

        return (
            <View style={[this.props.style]}>
                <Icon style={styles.icon} name={IconsMap[data.icon].icon} size={widthDependedPixel(50)} color={Color.DARK_BLUE} />
                <Text style={styles.day}>{data.day}</Text>
                <Text style={styles.temp}>{data.minTemp}°/{data.maxTemp}°</Text>
                <Text style={styles.title}>{titleCase(data.title)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        flex: 2
    },
    day: {
        ...common.regularText,
        paddingLeft: '2%',
        flex: 2
    },
    temp: {
        ...common.regularText,
        fontFamily: Font.QUICKSAND_SEMIBOLD,
        flex: 3
    },
    title: {
        ...common.regularText,
        flex: 5,
        flexWrap: 'wrap'
    }
})

export default DailyShortForecast;