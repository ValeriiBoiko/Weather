import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { bottomTabsConfig } from '../../navigation/bottomTabs';
import TabBar from '../TabBar';

function ScreenWrapper(props) {

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}
        bounces={props.scrollable ? true : false}
        contentInsetAdjustmentBehavior={'never'}
        contentOffset={{ y: 0 }}
        contentContainerStyle={{
          flex: props.scrollable ? 0 : 1,
        }} >
        {props.children}
      </ScrollView>
      <TabBar config={bottomTabsConfig()} />
    </View>
  );
}

ScreenWrapper.defaultProps = {
  scrollable: true
};

const getStyles = props => (
  StyleSheet.create({
    headerColor: {
      backgroundColor: props.headerColor,
    },
    bodyColor: {
      backgroundColor: props.bodyColor,
    },
    footerColor: {
      backgroundColor: props.footerColor,
    },
  })
);

export default ScreenWrapper;
