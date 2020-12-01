import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from '../../../ui/Icon/Icon';
import { Color, ColorScheme, Font } from '../../../constants';
import { widthDependedPixel } from '../../../utils/units';
import { connect } from 'react-redux';
import { common } from '../../../styles/common';
import PropTypes from 'prop-types';

function Item({ style, value, title, iconSize, iconName, colorScheme, ...props }) {
  const styles = useMemo(() => getStyles(colorScheme), [colorScheme]);

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

const getStyles = colorScheme => (
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      color: Color[colorScheme].BLACK,
      opacity: .75,
    },
    title: {
      fontSize: widthDependedPixel(17),
      lineHeight: widthDependedPixel(21),
      paddingBottom: widthDependedPixel(5),
      color: Color[colorScheme].BLACK,
      fontFamily: Font.COMFORTAA_LIGHT,
    },
    value: {
      ...common.regularText,
      fontFamily: Font.COMFORTAA_SEMIBOLD,
      color: Color[colorScheme].BLACK,
    },
  })
);

const mapStateToProps = state => ({
  colorScheme: state.colorScheme,
});

Item.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,
  iconName: PropTypes.string.isRequired,
  colorScheme: PropTypes.oneOf([ColorScheme.DARK, ColorScheme.LIGHT])
}

export default connect(mapStateToProps)(Item);
