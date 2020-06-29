import { TouchableNativeFeedback, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { isAndroid } from '../../utils';

function Touchable(props) {
  const touchable = isAndroid ? (
    <TouchableNativeFeedback
      {...props}
      background={TouchableNativeFeedback.Ripple(props.ripple)}>
      <View style={props.style || {}}>{props.children}</View>
    </TouchableNativeFeedback>
  ) : (
      <TouchableOpacity {...props} activeOpacity={0.5}>
        {props.children}
      </TouchableOpacity>
    );

  return touchable;
}

Touchable.defaultProps = {
  ripple: 'rgba(255,255,255, .25)',
};

export default Touchable;
