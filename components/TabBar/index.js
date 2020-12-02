import React from 'react';
import { View } from 'react-native';
import { Color, ColorScheme } from '../../constants';
import Tab from './Tab';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function TabBar({ colorScheme, config, style, ...props }) {

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
      height: 60,
      justifyContent: 'space-around',
      backgroundColor: Color[colorScheme].TAB_BAR,
    }]}>{tabs}</View>
  );
}

const mapStateToProps = state => ({
  colorScheme: state.colorScheme,
});

TabBar.propTypes = {
  config: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.object
    }))
  }),
  colorScheme: PropTypes.oneOf([ColorScheme.DARK, ColorScheme.LIGHT]).isRequired,
  style: PropTypes.object
}

export default connect(mapStateToProps)(TabBar);
