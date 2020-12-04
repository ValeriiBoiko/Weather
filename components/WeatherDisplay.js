import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNImage from './Image';
import { Font, IconsMap } from '../constants';
import { widthDependedPixel, widthPercentageToDP, heightDependedPixel, calcWidth } from '../utils/units';
import { connect } from 'react-redux';
import Icon from './Icon';
import { common } from '../styles/common';
import { titleCase } from '../utils';
import data from "../localization.json";

function WeatherDisplay(props) {
  const getDate = (ms = null) => {
    const days = data.days.longName[props.lang];
    const months = data.months[props.lang];
    const date = ms ? new Date(ms) : new Date();

    return (
      <Text style={styles.date}>
        {days[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <RNImage source={props.theme.backgroundImage} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.info}>
          <View style={common.flex}>
            <Text style={styles.city}>{props.city}</Text>
            {!props.compact && getDate()}
            <Text style={styles.weather}>
              {titleCase(props.weather.description)}
            </Text>
          </View>

          <Icon
            size={widthDependedPixel(120)}
            name={IconsMap[props.weather.icon].icon}
            color={'#fff'}
          />
        </View>

        <View style={styles.tempContainer}>
          <View style={common.row}>
            <Text style={styles.temperature}>{Math.round(props.weather.temp)}</Text>
            <Text style={styles.unit}>
              °{data.units[props.unitSystem].temp}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingBottom: widthPercentageToDP(2.5),
  },
  image: {
    bottom: 0,
    position: 'absolute',
  },
  info: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: widthDependedPixel(125),
  },
  city: {
    flexWrap: 'wrap',
    color: '#fff',
    fontSize: widthDependedPixel(24),
    lineHeight: widthDependedPixel(30),
    fontFamily: Font.COMFORTAA_REGULAR,
  },
  date: {
    paddingBottom: heightDependedPixel(8),
    fontFamily: Font.COMFORTAA_REGULAR,
    lineHeight: widthDependedPixel(19),
    fontSize: widthDependedPixel(15),
    color: '#fff',
  },
  weather: {
    color: '#fff',
    fontSize: widthDependedPixel(16),
    lineHeight: widthDependedPixel(20),
    paddingTop: heightDependedPixel(4),
    fontFamily: Font.COMFORTAA_SEMIBOLD,
  },
  tempContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  temperature: {
    color: '#fff',
    fontSize: widthDependedPixel(75),
    fontFamily: Font.COMFORTAA_MEDIUM,
    lineHeight: widthDependedPixel(100),
  },
  unit: {
    color: '#fff',
    fontSize: widthDependedPixel(35),
    lineHeight: widthDependedPixel(43),
    fontFamily: Font.COMFORTAA_SEMIBOLD,
    letterSpacing: 2,
  },
});

const mapStateToProps = (state, props) => ({
  city: state.weather.city,
  weather: state.weather.today,
  lang: state.lang,
  theme: state.displayTheme,
  unitSystem: state.unitSystem,
  compact: props.compact === null ? false : props.compact,
});

export default connect(mapStateToProps)(WeatherDisplay);
