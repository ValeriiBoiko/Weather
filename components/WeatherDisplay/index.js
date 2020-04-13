import React from 'react';
import { View, StyleSheet, Text, Platform, PixelRatio, Dimensions } from 'react-native';
import RNImage from '../../ui/Image';
import { Color, Font, IconsMap } from '../../constants';
import { widthDependedPixel, widthPercentageToDP, heightDependedPixel, calcWidth } from '../../utils/units';
import { connect } from 'react-redux';
import Icon from '../../ui/Icon/Icon';
import { common } from '../../styles/common';
import { titleCase } from '../../utils';

class WeatherDisplay extends React.Component {

    render() {
        const scale = this.props.compact ? 0.8 : 1;
        const styleProps = {
            scale: scale,
        }
 
        return (
            <View style={styles.container}>
                <RNImage source={this.props.theme.backgroundImage}
                    style={styles.image} />
                <View style={styles.content}>
                    <View style={styles.info}>
                        <View style={common.flex}>
                            <Text style={styles.city}>{this.props.city}</Text>
                            { this.props.compact ? null : this.getDate() }
                            <Text style={styles.weather}>
                                {titleCase(this.props.weather.description)}
                            </Text>
                        </View>

                        <Icon size={widthDependedPixel(120) * scale} name={IconsMap[this.props.weather.icon].icon} color={Color.WHITE} />
                    </View>

                    <View style={styles.tempContainer}>
                        <View style={common.row}>
                            <Text style={dynamicStyles(styleProps).temperature}>{Math.round(this.props.weather.temp) || null}</Text>
                            <Text style={dynamicStyles(styleProps).unit}>°C</Text>
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
        alignItems: 'center',
        minHeight: widthDependedPixel(125)
    },
    city: {
        flexWrap: 'wrap',
        color: Color.WHITE,
        fontSize: widthDependedPixel(24),
        lineHeight: widthDependedPixel(30),
        fontFamily: Font.QUICKSAND_REGULAR
    },
    date: {
        paddingBottom: heightDependedPixel(8),
        fontFamily: Font.QUICKSAND_REGULAR,
        lineHeight: widthDependedPixel(19),
        fontSize: widthDependedPixel(15),
        color: Color.WHITE,
    },
    weather: {
        color: Color.WHITE,
        fontSize: widthDependedPixel(16),
        lineHeight: widthDependedPixel(20),
        paddingTop: heightDependedPixel(4),
        fontFamily: Font.QUICKSAND_SEMIBOLD
    },
    tempContainer: {
        justifyContent: 'flex-end',
        flex: 1
    }
})

const dynamicStyles = (props = {}) => StyleSheet.create({
    temperature: {
        color: Color.WHITE,
        fontSize: widthDependedPixel(75) * (props.scale || 1),
        fontFamily: Font.QUICKSAND_MEDIUM,
        lineHeight: widthDependedPixel(100) * (props.scale || 1)
    },
    unit: {
        color: Color.WHITE,
        fontSize: widthDependedPixel(35) * (props.scale || 1),
        lineHeight: widthDependedPixel(43) * (props.scale || 1),
        fontFamily: Font.QUICKSAND_SEMIBOLD
    }
})

const mapStateToProps = (state, props) => ({
    city: state.weather.city,
    weather: state.weather.today,
    theme: state.displayTheme,
    compact: props.compact === null ? false : props.compact
});

export default connect(mapStateToProps)(WeatherDisplay);