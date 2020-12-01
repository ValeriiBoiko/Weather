import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Color, ColorScheme, GeoSource, Language, Unit } from '../constants';
import { heightPercentageToDP } from '../utils/units';
import { connect } from 'react-redux';
import WeatherDisplay from '../components/WeatherDisplay';
import DetailWeatherInfo from '../components/DetailWeatherInfo';
import { common } from '../styles/common';
import ScreenWrapper from '../components/ScreenWrapper';
import { setLocation, setWeather } from '../action';
import PropTypes from 'prop-types';

function DailyForecast(props) {
  const styles = getStyles(props);

  useEffect(() => {
    if (!props.location.latitude || !props.location.latitude) {
      props.setLocation(props.geoSource);
    }
  }, [])

  useEffect(() => {
    if (props.location.latitude && props.location.latitude) {
      props.setWeather(props.location, props.unitSystem, props.lang)
    }
  }, [props.location])

  return (
    <ScreenWrapper
      headerColor={props.theme.backgroundColor}
      bodyColor={Color[props.colorScheme].WHITE}
      footerColor={Color[props.colorScheme].TAB_BAR}
      render={availableHeight => (
        <View style={common.flex}>
          <View style={[
            styles.weatherDisplayContainer,
            { height: heightPercentageToDP(70, availableHeight) }
          ]}>
            <WeatherDisplay />
          </View>
          <DetailWeatherInfo />
        </View>
      )}
    />
  );
}

const getStyles = props => (
  StyleSheet.create({
    weatherDisplayContainer: {
      backgroundColor: props.theme.backgroundColor,
      overflow: 'hidden',
    },
  })
);

const mapStateToProps = state => ({
  theme: state.displayTheme,
  colorScheme: state.colorScheme,
  unitSystem: state.unitSystem,
  lang: state.lang,
  location: state.location,
  geoSource: state.locationSource,
});

const mapDispatchToProps = (dispatch) => ({
  setWeather: (location, unit, lang) => dispatch(setWeather(location, unit, lang)),
  setLocation: (source) => dispatch(setLocation(source))
});

DailyForecast.propTypes = {
  lang: PropTypes.oneOf([Language.EN, Language.UA]).isRequired,
  unitSystem: PropTypes.oneOf([Unit.IMPERIAL, Unit.METRIC]).isRequired,
  geoSource: PropTypes.oneOf(Object.values(GeoSource)).isRequired,
  colorScheme: PropTypes.oneOf([ColorScheme.DARK, ColorScheme.LIGHT]).isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }).isRequired,
  setLocation: PropTypes.func.isRequired,
  setWeather: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(DailyForecast);
