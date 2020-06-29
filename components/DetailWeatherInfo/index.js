import React from 'react';
import { View, StyleSheet } from 'react-native';
import Item from './Item';
import { widthDependedPixel } from '../../utils/units';
import { Color } from '../../constants';
import { connect } from 'react-redux';
import data from '../../localization.json';

function millisecondsToTime(ms) {
  const date = new Date(ms);
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes}`;
}

function DetailWeatherInfo(props) {
  const styles = getStyles(props);
  const iconSize = widthDependedPixel(65);
  let sunrise = props.sunrise;
  let sunset = props.sunset;

  if (Number.isInteger(sunrise)) {
    sunrise = millisecondsToTime(sunrise);
  }

  if (Number.isInteger(sunset)) {
    sunset = millisecondsToTime(sunset);
  }

  return (
    <View style={[styles.container, props.style]}>
      <Item
        style={styles.item}
        name={'temp'}
        size={iconSize}
        title={data.phrase.feelsLike[props.lang]}
        value={props.weather.temp + ' °' + data.units[props.unitSystem].temp}
      />
      <Item
        style={styles.item}
        name={'wind'}
        size={iconSize}
        title={data.phrase.wind[props.lang]}
        value={props.weather.wind + ' ' + data.units[props.unitSystem].speed}
      />
      <Item
        style={styles.item}
        name={'sunrise'}
        size={iconSize}
        title={data.phrase.sunrise[props.lang]}
        value={sunrise}
      />
      <Item
        style={styles.item}
        name={'sunset'}
        size={iconSize}
        title={data.phrase.sunset[props.lang]}
        value={sunset}
      />
    </View>
  );
}

const getStyles = props => (
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: Color[props.colorScheme].WHITE,
      alignContent: 'stretch',
      flex: 1,
    },
    item: {
      minWidth: '50%',
    },
  })
);

const mapStateToProps = state => ({
  weather: state.weather.today,
  sunset: state.weather.sunset,
  sunrise: state.weather.sunrise,
  lang: state.lang,
  colorScheme: state.colorScheme,
  unitSystem: state.unitSystem,
});

export default connect(mapStateToProps)(DetailWeatherInfo);
