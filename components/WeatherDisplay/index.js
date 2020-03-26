import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNImage from '../../ui/Image';
import { Color, Font, IconsMap } from '../../constants';
import { widthDependedPixel, widthPercentageToDP, heightDependedPixel } from '../../utils/units';
import { connect } from 'react-redux';
import Icon from '../../ui/Icon/Icon';
import { common } from '../../styles/common';
import { titleCase } from '../../utils';

class WeatherDisplay extends React.Component {

    render() {

        return (
            <View style={styles.container}>
                <RNImage source={this.props.theme.backgroundImage}
                    style={styles.image} />

                <View style={styles.content}>
                    <View style={styles.info}>
                        <View>
                            <Text style={styles.city}>{this.props.city}</Text>
                            {this.getDate()}
                            <Text style={styles.weather}>
                                {titleCase(this.props.weather.description)}
                            </Text>
                        </View>

                        <Icon size={widthDependedPixel(135)} name={IconsMap[this.props.weather.icon].icon} color={Color.WHITE} />
                    </View>

                    <View style={styles.tempContainer}>
                        <View style={common.row}>
                            <Text style={styles.temperature}>{Math.round(this.props.weather.temp) || null}</Text>
                            <Text style={styles.unit}>°C</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    getDate = (ms = null) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednsday', 'Thurstday', 'Friday', 'Saturday']
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const date = ms ? new Date(ms) : new Date();

        return (
            <Text style={styles.date}>{days[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}</Text>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: '5%',
        paddingBottom: widthPercentageToDP(2.5),
        paddingTop: 10
    },
    image: {
        bottom: 0,
        position: 'absolute'
    },
    info: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    city: {
        flexWrap: 'wrap',
        color: Color.WHITE,
        fontSize: widthDependedPixel(24),
        lineHeight: widthDependedPixel(24),
        fontFamily: Font.QUICKSAND_REGULAR
    },
    date: {
        color: Color.WHITE,
        fontSize: widthDependedPixel(14),
        lineHeight: widthDependedPixel(20),
        fontFamily: Font.QUICKSAND_REGULAR
    },
    weather: {
        color: Color.WHITE,
        fontSize: widthDependedPixel(16),
        lineHeight: widthDependedPixel(16),
        paddingTop: heightDependedPixel(17.5),
        fontFamily: Font.QUICKSAND_SEMIBOLD
    },
    tempContainer: {
        justifyContent: 'flex-end',
        flex: 1
    },
    temperature: {
        color: Color.WHITE,
        fontSize: widthDependedPixel(75),
        fontFamily: Font.QUICKSAND_MEDIUM,
        lineHeight: widthDependedPixel(75)
    },
    unit: {
        color: Color.WHITE,
        fontSize: widthDependedPixel(35),
        lineHeight: widthDependedPixel(35),
        fontFamily: Font.QUICKSAND_SEMIBOLD
    }
})

const mapStateToProps = (state) => ({
    city: state.weather.data.city,
    weather: state.weather.data.today,
    theme: state.weather.displayTheme
});

export default connect(mapStateToProps)(WeatherDisplay);