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
        const coef = this.props.compact ? 0.9 : 1;
        const styleProps = {
            coef: coef
        }

        return (
            <View style={styles(styleProps).container}>
                <RNImage source={this.props.theme.backgroundImage}
                    style={styles(styleProps).image} />

                <View style={styles(styleProps).content}>
                    <View style={styles(styleProps).info}>
                        <View>
                            <Text style={styles(styleProps).city}>{this.props.city}</Text>
                            {this.getDate()}
                            <Text style={styles(styleProps).weather}>
                                {titleCase(this.props.weather.description)}
                            </Text>
                        </View>

                        <Icon size={widthDependedPixel(120 * coef)} name={IconsMap[this.props.weather.icon].icon} color={Color.WHITE} />
                    </View>

                    <View style={styles(styleProps).tempContainer}>
                        <View style={common.row}>
                            <Text style={styles(styleProps).temperature}>{Math.round(this.props.weather.temp) || null}</Text>
                            <Text style={styles(styleProps).unit}>°C</Text>
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
            <Text style={styles({
                coef: this.props.compact ? 0.85 : 1
            }).date}>{days[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}</Text>
        )
    }
}

const styles = (props = {}) => StyleSheet.create({
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
        fontSize: widthDependedPixel(75) * props.coef,
        fontFamily: Font.QUICKSAND_MEDIUM,
        lineHeight: widthDependedPixel(75) * props.coef
    },
    unit: {
        color: Color.WHITE,
        fontSize: widthDependedPixel(35) * props.coef,
        lineHeight: widthDependedPixel(35) * props.coef,
        fontFamily: Font.QUICKSAND_SEMIBOLD
    }
})

const mapStateToProps = (state, props) => ({
    city: state.weather.data.city,
    weather: state.weather.data.today,
    theme: state.weather.displayTheme,
    compact: props.compact === null ? false : props.compact
});

export default connect(mapStateToProps)(WeatherDisplay);