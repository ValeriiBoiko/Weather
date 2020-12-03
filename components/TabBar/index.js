import React from 'react';
import { View } from 'react-native';
import Tab from './Tab';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTheme from '../../theming/useTheme';

function TabBar({ config, style, ...props }) {
  const colors = useTheme();
  const bottomInset = useSafeAreaInsets().bottom;

  const tabs = config.children.map((tab, index) => (
    <Tab
      key={tab.component.id}
      component={tab.component.id}
      index={index}
      options={tab.component.options.bottomTab}
    />
  ));

  return (
    <View style={[style, {
      flexDirection: 'row',
      height: 60 + bottomInset,
      paddingBottom: bottomInset,
      justifyContent: 'space-around',
      backgroundColor: colors.border,
    }]}>{tabs}</View>
  );
}

TabBar.propTypes = {
  config: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.object
    }))
  }),
  style: PropTypes.object
}

export default TabBar;
