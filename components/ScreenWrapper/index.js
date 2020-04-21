import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { bottomTabsConfig } from '../../navigation/bottomTabs';
import { common } from '../../styles/common';
import TabBar from '../TabBar';

function ScreenWrapper (props) {
    const [height, setHeight] = useState(0);
    const styles = getStyles(props);

    return (
      <View style={common.flex}>
        <SafeAreaView style={styles.headerColor} />
        <SafeAreaView style={[styles.bodyColor, common.flex]}
          onLayout={e => setHeight(e.nativeEvent.layout.height)}>
          <ScrollView contentContainerStyle={common.flex}>
            {
              props.render ? props.render(height) : props.children
            }          
          </ScrollView>

          <TabBar config={bottomTabsConfig()} />
        </SafeAreaView>
        <SafeAreaView style={styles.footerColor} />
      </View>
    )
}

ScreenWrapper.defaultProps = {
    headerColor: "#fff",
    bodyColor: "#fff",
    footerColor: "#fff",
}

const getStyles = (props) => StyleSheet.create({
    headerColor: {
        backgroundColor: props.headerColor
    },
    bodyColor: {
        backgroundColor: props.bodyColor
    },
    footerColor: {
        backgroundColor: props.footerColor
    },
})

export default ScreenWrapper;