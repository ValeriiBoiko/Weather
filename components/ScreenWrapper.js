import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { bottomTabsConfig } from '../navigation/bottomTabs';
import useTheme from '../theming/useTheme';
import TabBar from './TabBar';

function ScreenWrapper(props) {
  const colors = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}
        bounces={false}
        contentInsetAdjustmentBehavior={'never'}
        contentOffset={{ y: 0 }}
        contentContainerStyle={[props.style, {
          flex: props.scrollable ? 0 : 1,
          backgroundColor: colors.background
        }]} >
        {props.children}
      </ScrollView>
      <TabBar config={bottomTabsConfig()} />
    </View>
  );
}

ScreenWrapper.defaultProps = {
  scrollable: true
};

const mapStateToProps = (state) => ({
  colorScheme: state.colorScheme
});

export default connect(mapStateToProps)(ScreenWrapper);
