import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '../constants';
import { connect } from 'react-redux';
import { common } from '../styles/common';
import { heightPercentageToDP } from '../utils/units';
import WeatherDisplay from '../components/WeatherDisplay';
import DailyShortForecast from '../components/DaillyLineForecast';
import ScreenWrapper from '../components/ScreenWrapper';

function WeeklyForecast(props) {
  const styles = getStyles(props);
  const dailyForecast = Object.values(props.weather).map(
    (item, index, values) => {
      const isLastDay = index === values.length - 1;
      const style = isLastDay ? styles.lastDayLine : styles.dayLine;
      return <DailyShortForecast key={item.day} data={item} style={style} />;
    },
  );

  return (
    <ScreenWrapper
      headerColor={props.theme.backgroundColor}
      bodyColor={Color[props.colorScheme].WHITE}
      footerColor={Color[props.colorScheme].TAB_BAR}
      render={availableHeight => (
        <View style={common.flex}>
          <View
            style={[
              styles.currentWeatherDisplay,
              { height: heightPercentageToDP(40, availableHeight) },
            ]}>
            <WeatherDisplay compact={true} />
          </View>
          {dailyForecast}
        </View>
      )}
    />
  );
}

const getStyles = props =>
  StyleSheet.create({
    currentWeatherDisplay: {
      backgroundColor: props.theme.backgroundColor,
    },
    dayLine: {
      borderBottomColor: Color[props.colorScheme].SEPARATOR,
      borderBottomWidth: 1,
      marginHorizontal: '5%',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    lastDayLine: {
      marginHorizontal: '5%',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

const mapStateToProps = state => {
  return {
    theme: state.displayTheme,
    weather: state.weather.week,
    colorScheme: state.colorScheme,
  };
};

export default connect(mapStateToProps)(WeeklyForecast);
