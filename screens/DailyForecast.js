import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ColorScheme, DarkTheme, GeoSource, Language, LightTheme, Unit } from '../constants';
import { connect } from 'react-redux';
import WeatherDisplay from '../components/WeatherDisplay';
import DetailWeatherInfo from '../components/DetailWeatherInfo';
import { common } from '../styles/common';
import ScreenWrapper from '../components/ScreenWrapper';
import { setLocation, setScreenAction, setWeather } from '../action';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemeProvider from '../theming/ThemeProvider';
import Loader from '../components/Loader';

function DailyForecast(props) {
  const styles = getStyles(props);
  const insets = useSafeAreaInsets();
  const [showLoader, setLoaderFlag] = useState(!props.isEmptyWeather);

  useEffect(() => {
    props.setScreen();
    if (!props.location.latitude || !props.location.latitude) {
      props.setLocation(props.geoSource);
    }
  }, [])

  useEffect(() => {
    if (props.location.latitude && props.location.latitude) {
      props.setWeather(props.location, props.unitSystem, props.lang)
    }
  }, [props.location])

  useEffect(() => {
    setLoaderFlag(!props.isEmptyWeather)
  }, [props.isEmptyWeather])

  return (
    <ThemeProvider value={props.colorScheme === ColorScheme.DARK ? DarkTheme : LightTheme}>
      <ScreenWrapper scrollable={false}>
        <View style={common.flex}>
          <View style={[
            styles.weatherDisplayContainer,
            {
              paddingTop: insets.top ? insets.top : 10,
              flex: 1.
            }
          ]}>
            <WeatherDisplay />
          </View>
          <DetailWeatherInfo />
        </View>
      </ScreenWrapper>

      <Loader isVisible={showLoader} label="Loading" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 60,
        flex: 1,
      }} />
    </ThemeProvider>
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
  isEmptyWeather: state.weather.sunrise,
  theme: state.displayTheme,
  unitSystem: state.unitSystem,
  lang: state.lang,
  location: state.location,
  geoSource: state.locationSource,
  colorScheme: state.colorScheme,
});

const mapDispatchToProps = (dispatch) => ({
  setWeather: (location, unit, lang) => dispatch(setWeather(location, unit, lang)),
  setLocation: (source) => dispatch(setLocation(source)),
  setScreen: () => dispatch(setScreenAction('screen.DailyForecast')),
});

DailyForecast.propTypes = {
  lang: PropTypes.oneOf([Language.EN, Language.UA]).isRequired,
  unitSystem: PropTypes.oneOf([Unit.IMPERIAL, Unit.METRIC]).isRequired,
  geoSource: PropTypes.oneOf(Object.values(GeoSource)).isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }).isRequired,
  theme: PropTypes.shape({
    backgroundColor: PropTypes.string.isRequired
  }).isRequired,
  setLocation: PropTypes.func.isRequired,
  setWeather: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(DailyForecast);
