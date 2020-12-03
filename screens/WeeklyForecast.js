import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { common } from '../styles/common';
import WeatherDisplay from '../components/WeatherDisplay';
import DailyShortForecast from '../components/DailyLineForecast';
import ScreenWrapper from '../components/ScreenWrapper';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemeProvider from '../theming/ThemeProvider';
import { ColorScheme, DarkTheme, LightTheme } from '../constants';

function WeeklyForecast({ weather, theme, ...props }) {
  const insets = useSafeAreaInsets();
  const dailyForecast = Object.values(weather).map(
    (item, index, values) => {
      const isLastDay = index === values.length - 1;
      const style = isLastDay ? { borderBottomWidth: 0 } : {};
      return <DailyShortForecast key={item.day} data={item} style={style} />;
    },
  );

  return (
    <ThemeProvider value={props.colorScheme === ColorScheme.DARK ? DarkTheme : LightTheme}>
      <ScreenWrapper scrollable={false}>
        <View style={common.flex}>
          <View
            style={[
              {
                backgroundColor: theme.backgroundColor,
                paddingTop: insets.top ? insets.top : 10,
                flex: 1,
              }
            ]}>
            <WeatherDisplay compact={true} />
          </View>
          {dailyForecast}
        </View>
      </ScreenWrapper>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  return {
    theme: state.displayTheme,
    weather: state.weather.week,
    colorScheme: state.colorScheme,
  };
};

WeeklyForecast.propTypes = {
  theme: PropTypes.shape({
    backgroundColor: PropTypes.string
  }).isRequired,
  weather: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(WeeklyForecast);
