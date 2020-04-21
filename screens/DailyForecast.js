import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '../constants';
import { heightPercentageToDP } from '../utils/units';
import { connect } from 'react-redux';
import WeatherDisplay from '../components/WeatherDisplay';
import DetailWeatherInfo from '../components/DetailWeatherInfo';
import { common } from '../styles/common';
import ScreenWrapper from '../components/ScreenWrapper';

function DailyForecast(props) {
  const styles = getStyles(props);
  
  return (
    <ScreenWrapper headerColor={props.theme.backgroundColor}
      bodyColor={Color[props.colorScheme].WHITE}
      footerColor={Color[props.colorScheme].TAB_BAR} 
      render={(availableHeight) => (
        <View style={common.flex}>
          <View style={[
            styles.weatherDisplayContainer,
            {height: heightPercentageToDP(70, availableHeight)}
          ]}>
            <WeatherDisplay />
          </View>
          <DetailWeatherInfo />
        </View>
      )} >
    </ScreenWrapper>
  )
}

const getStyles = (props) => StyleSheet.create({
  weatherDisplayContainer: {
    backgroundColor: props.theme.backgroundColor,
    overflow: 'hidden'
  }
})

const mapStateToProps = (state) => ({
  theme: state.displayTheme,
  colorScheme: state.colorScheme
});

export default connect(mapStateToProps)(DailyForecast);