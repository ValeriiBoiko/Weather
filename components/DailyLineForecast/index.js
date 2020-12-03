import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from '../../ui/Icon/Icon';
import { Font, IconsMap } from '../../constants';
import { common } from '../../styles/common';
import { widthDependedPixel } from '../../utils/units';
import { titleCase } from '../../utils';
import useTheme from '../../theming/useTheme';

function DailyLineForecast(props) {
  const colors = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);
  let data = props.data;

  return (
    <View style={[styles.item, props.style]}>
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

const getStyles = colors => (
  StyleSheet.create({
    item: {
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      marginHorizontal: '5%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      flex: 2,
      color: colors.text,
    },
    day: {
      ...common.regularText,
      color: colors.text,
      paddingLeft: '2%',
      flex: 2,
    },
    temp: {
      ...common.regularText,
      color: colors.text,
      fontFamily: Font.COMFORTAA_SEMIBOLD,
      flex: 3,
    },
    title: {
      ...common.regularText,
      color: colors.text,
      flex: 5,
      flexWrap: 'wrap',
    },
  })
);

export default DailyLineForecast;
