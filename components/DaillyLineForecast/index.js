import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from '../../ui/Icon/Icon';
import { Color, Font, IconsMap } from '../../constants';
import { common } from '../../styles/common';
import { widthDependedPixel } from '../../utils/units';
import { titleCase } from '../../utils';
import { connect } from 'react-redux';

function DailyForecast(props) {
  const styles = getStyles(props);
  let data = props.data;

  return (
    <View style={[props.style]}>
      <Icon
        style={styles.icon}
        name={IconsMap[data.icon].icon}
        size={widthDependedPixel(50)}
      />
      <Text style={styles.day}>{data.day}</Text>
      <Text style={styles.temp}>
        {data.minTemp}°/{data.maxTemp}°
      </Text>
      <Text style={styles.title}>{titleCase(data.title)}</Text>
    </View>
  );
}

const getStyles = props => (
  StyleSheet.create({
    icon: {
      flex: 2,
      color: Color[props.colorScheme].BLACK,
    },
    day: {
      ...common.regularText,
      color: Color[props.colorScheme].BLACK,
      paddingLeft: '2%',
      flex: 2,
    },
    temp: {
      ...common.regularText,
      color: Color[props.colorScheme].BLACK,
      fontFamily: Font.COMFORTAA_SEMIBOLD,
      flex: 3,
    },
    title: {
      ...common.regularText,
      color: Color[props.colorScheme].BLACK,
      flex: 5,
      flexWrap: 'wrap',
    },
  })
);

const mapStateToProps = state => ({
  colorScheme: state.colorScheme,
});

export default connect(mapStateToProps)(DailyForecast);
