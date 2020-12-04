import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from '../../Icon';
import { Font } from '../../../constants';
import { widthDependedPixel } from '../../../utils/units';
import { common } from '../../../styles/common';
import PropTypes from 'prop-types';
import useTheme from '../../../theming/useTheme';

function Item({ style, value, title, iconSize, iconName, ...props }) {
  const colors = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <View {...props} style={[style, styles.container]}>
      <Icon name={iconName} style={styles.icon} size={iconSize} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const getStyles = colors => (
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      color: colors.text,
      opacity: .75,
    },
    title: {
      fontSize: widthDependedPixel(17),
      lineHeight: widthDependedPixel(21),
      paddingBottom: widthDependedPixel(5),
      color: colors.text,
      fontFamily: Font.COMFORTAA_LIGHT,
    },
    value: {
      ...common.regularText,
      fontFamily: Font.COMFORTAA_SEMIBOLD,
      color: colors.text,
    },
  })
);


Item.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,
  iconName: PropTypes.string.isRequired,
}

export default Item;
