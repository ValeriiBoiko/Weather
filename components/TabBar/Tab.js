import React, { useMemo } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setScreenAction } from '../../action';
import { Color, Font } from '../../constants';
import { View } from 'react-native';
import Icon from '../../ui/Icon/Icon';
import { Text } from 'react-native';
import { common } from '../../styles/common';
import { StyleSheet } from 'react-native';
import { heightDependedPixel } from '../../utils/units';
import { TouchableWithoutFeedback } from 'react-native';
import useTheme from '../../theming/useTheme';

function Tab({ options, component, currentScreen, index, ...props }) {
  const colors = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const isActive = component === currentScreen;
  let iconStyle = {};
  let labelStyle = {};

  if (isActive) {
    iconStyle.color = options.selectedIconColor;
    labelStyle.color = options.selectedIconColor;
  }

  const openTab = () => {
    props.setScreen(component)
    Navigation.mergeOptions(component, {
      bottomTabs: { currentTabIndex: index },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={openTab} style={common.flex}>
      <View style={[styles.tab, props.style]}>
        <Icon
          style={[styles.icon, iconStyle]}
          name={options.icon}
          size={35}
        />
        <Text style={[styles.label, labelStyle]}>{options.text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const getStyles = colors => (
  StyleSheet.create({
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      lineHeight: 12,
      fontSize: 12,
      color: colors.text
    },
    icon: {
      marginBottom: -4,
      fontSize: heightDependedPixel(35),
      lineHeight: 35,
      color: colors.text,
    },
  })
)


const mapStateToProps = state => ({
  currentScreen: state.currentScreen,
});

const mapDispatchToScreen = dispatch => ({
  setScreen: screen => dispatch(setScreenAction(screen)),
});

Tab.defaultProps = {
  defaultStyle: {
    fontFamily: Font.COMFORTAA_BOLD,
    fontSize: 12
  }
};

Tab.propTypes = {
  style: PropTypes.object,
  currentScreen: PropTypes.string,
  component: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  options: PropTypes.shape({
    icon: PropTypes.string,
    text: PropTypes.string,
    selectedIconColor: PropTypes.string,
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToScreen)(
  React.memo(Tab, (prev, next) => {
    if (prev.currentScreen !== next.currentScreen) {
      return false;
    } else if (prev.colorScheme !== next.colorScheme) {
      return false;
    }

    return true;
  })
);
