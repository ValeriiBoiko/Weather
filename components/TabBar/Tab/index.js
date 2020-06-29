import React from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import Tab from './Tab';
import { setScreenAction } from '../../../action';

function TabContainer(props) {
  Navigation.events().registerComponentDidAppearListener(
    ({ componentId, componentName, passProps }) => props.setScreen(componentId),
  );

  const openTab = () => {
    if (props.component !== props.currentScreen) {
      Navigation.mergeOptions(props.component, {
        bottomTabs: {
          currentTabIndex: props.index,
        },
        statusBar: {
          visible: false,
        },
      });
    }
  };

  return (
    <Tab
      onPress={openTab}
      {...props}
      active={props.component === props.currentScreen}
    />
  );
}

const mapStateToProps = state => ({
  currentScreen: state.currentScreen,
});

const mapDispatchToScreen = dispatch => ({
  setScreen: screen => dispatch(setScreenAction(screen)),
});

export default connect(
  mapStateToProps,
  mapDispatchToScreen,
)(TabContainer);
