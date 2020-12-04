import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { widthDependedPixel } from '../utils/units';
import { connect } from 'react-redux';
import { common } from '../styles/common';
import useTheme from '../theming/useTheme';

function SettingRow(props) {
  const colors = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.settingRow}>
      <View style={styles.settingTitle}>
        <Text style={styles.settingTitleText}>{props.title}</Text>
      </View>
      {props.children}
    </View>
  );
}

const getStyles = colors => (
  StyleSheet.create({
    settingRow: {
      marginHorizontal: '4%',
      marginVertical: widthDependedPixel(15),
    },
    settingTitle: {
      borderBottomColor: colors.text,
      borderBottomWidth: 1,
      paddingBottom: widthDependedPixel(5),
      marginBottom: widthDependedPixel(15),
    },
    settingTitleText: {
      ...common.largerText,
      color: colors.text,
    },
  })
);

const mapStateToProps = state => ({
  lang: state.lang,
});

export default connect(mapStateToProps)(SettingRow);
