import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from '../../../ui/Icon/Icon';
import { Color, Font } from '../../../constants';
import { widthDependedPixel } from '../../../utils/units';
import { connect } from 'react-redux';
import { common } from '../../../styles/common';

function Item(props) {
  const styles = getStyles(props);

  return (
    <View style={[props.style, styles.container]}>
      <Icon name={props.name} style={styles.icon} size={props.size} />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.value}>{props.value}</Text>
      </View>
    </View>
  );
}

const getStyles = props => (
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      color: Color[props.colorScheme].BLACK,
      opacity: .75,
    },
    title: {
      fontSize: widthDependedPixel(17),
      lineHeight: widthDependedPixel(21),
      paddingBottom: widthDependedPixel(5),
      color: Color[props.colorScheme].BLACK,
      fontFamily: Font.COMFORTAA_LIGHT,
    },
    value: {
      ...common.regularText,
      fontFamily: Font.COMFORTAA_SEMIBOLD,
      color: Color[props.colorScheme].BLACK,
    },
  })
);

const mapStateToProps = state => ({
  colorScheme: state.colorScheme,
});

export default connect(mapStateToProps)(Item);
