import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Item from './Item';
import { widthDependedPixel } from '../../utils/units';
import { Color, ColorScheme, Language, Unit } from '../../constants';
import { connect } from 'react-redux';
import data from '../../localization.json';
import PropTypes from 'prop-types';

function millisecondsToTime(ms) {
  const date = new Date(ms);
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes}`;
}

function DetailWeatherInfo({ sunrise, sunset, unitSystem, lang, colorScheme, weather, ...props }) {
  const styles = useMemo(() => getStyles(colorScheme), [colorScheme]);
  const iconSize = widthDependedPixel(65);
  const sunriseTime = sunrise ? millisecondsToTime(sunrise) : 'n/a';
  const sunsetTime = sunset ? millisecondsToTime(sunset) : 'n/a';

  return (
    <View style={[styles.container, props.style]}>
      <Item
        style={styles.item}
        iconName={'temp'}
        iconSize={iconSize}
        title={data.phrase.feelsLike[lang]}
        value={weather.feelsLike + ' °' + data.units[unitSystem].temp}
      />
      <Item
        style={styles.item}
        iconName={'wind'}
        iconSize={iconSize}
        title={data.phrase.wind[lang]}
        value={weather.wind + ' ' + data.units[unitSystem].speed}
      />
      <Item
        style={styles.item}
        iconName={'sunrise'}
        iconSize={iconSize}
        title={data.phrase.sunrise[lang]}
        value={sunriseTime}
      />
      <Item
        style={styles.item}
        iconName={'sunset'}
        iconSize={iconSize}
        title={data.phrase.sunset[lang]}
        value={sunsetTime}
      />
    </View>
  );
}

const getStyles = colorScheme => (
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: Color[colorScheme].WHITE,
      alignContent: 'stretch',
    },
    item: {
      minWidth: '50%',
      height: 90
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

DetailWeatherInfo.propTypes = {
  style: PropTypes.object,
  weather: PropTypes.object.isRequired,
  sunset: PropTypes.number.isRequired,
  sunrise: PropTypes.number.isRequired,
  lang: PropTypes.oneOf([Language.EN, Language.UA]).isRequired,
  colorScheme: PropTypes.oneOf([ColorScheme.DARK, ColorScheme.LIGHT]).isRequired,
  unitSystem: PropTypes.oneOf([Unit.IMPERIAL, Unit.METRIC]).isRequired,
};

export default connect(mapStateToProps)(DetailWeatherInfo);
