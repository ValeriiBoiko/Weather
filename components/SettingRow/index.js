import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Color } from '../../constants';
import { widthDependedPixel } from '../../utils/units';
import { connect } from 'react-redux';
import { common } from '../../styles/common';

function SettingRow (props) {
    const styles = getStyles(props);

    return (
        <View style={styles.settingRow}>
            <View style={styles.settingTitle}>
                <Text style={styles.settingTitleText}>{props.title}</Text>
            </View>
            {props.children}
        </View>
    )
}

const getStyles = (props) => (
    StyleSheet.create({
        settingRow: {
            marginHorizontal: '4%',
            marginVertical: widthDependedPixel(15),
        },
        settingTitle: {
            borderBottomColor: Color[props.colorScheme].BLACK,
            borderBottomWidth: 1,
            paddingBottom: widthDependedPixel(5),
            marginBottom: widthDependedPixel(15),
        },
        settingTitleText: {
            ...common.largerText,
            color: Color[props.colorScheme].BLACK
        }
    })
)

const mapStateToProps = (state) => ({
    lang: state.lang,
    colorScheme: state.colorScheme,
});

export default connect(mapStateToProps)(SettingRow);