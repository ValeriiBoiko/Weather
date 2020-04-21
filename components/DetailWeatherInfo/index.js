import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Item from './Item';
import { widthDependedPixel, widthPercentageToDP } from '../../utils/units';
import { Color } from '../../constants';
import { connect } from 'react-redux';
import data from '../../localization.json';

class DetailWeatherInfo extends React.Component {

    render() {
        const styles = getStyles(this.props);

        let sunrise = this.props.sunrise;
        let sunset = this.props.sunset;

        if (Number.isInteger(sunrise)) {
            sunrise = new Date(sunrise);
            const hour = sunrise.getHours();
            const minutes = sunrise.getMinutes();
            sunrise = `${hour}:${minutes}`;
        }


        if (Number.isInteger(sunset)) {
            sunset = new Date(sunset);
            const hour = sunset.getHours();
            const minutes = sunset.getMinutes();
            sunset = `${hour}:${minutes}`;
        }

        return (
            <View style={[
                styles.container,
                this.props.style
            ]}>
                <Item style={styles.item} 
                    name={'temp'} size={widthDependedPixel(65)}
                    title={data.phrase.feelsLike[this.props.lang]} value={this.props.weather.temp + ' °' + data.units[this.props.unitSystem].temp}/>
                <Item style={styles.item} 
                    name={'wind'} size={widthDependedPixel(65)}
                    title={data.phrase.wind[this.props.lang]} value={this.props.weather.wind +  ' ' + data.units[this.props.unitSystem].speed} />
                <Item style={styles.item} 
                    name={'sunrise'} size={widthDependedPixel(65)}
                    title={data.phrase.sunrise[this.props.lang]} value={sunrise} />
                <Item style={styles.item} 
                    name={'sunset'} size={widthDependedPixel(65)}
                    title={data.phrase.sunset[this.props.lang]} value={sunset} />
            </View>
        )
    }
}

const getStyles = (props) => (
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: Color[props.colorScheme].WHITE,
            alignContent: 'stretch',
            flex: 1,
        },
        item: {
            minWidth: '50%'
        }
    })
)

const mapStateToProps = (state) => ({
    weather: state.weather.today,
    sunset: state.weather.sunset,
    sunrise: state.weather.sunrise,
    lang: state.lang,
    colorScheme: state.colorScheme,
    unitSystem: state.unitSystem
})

export default connect(mapStateToProps)(DetailWeatherInfo);