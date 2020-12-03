import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { widthDependedPixel } from '../../utils/units';
import Touchable from '../../ui/Touchable';
import Icon from '../../ui/Icon/Icon';
import useTheme from '../../theming/useTheme';

function ButtonGroup({ selected, activeBackground, buttons, ...props }) {
  const [activeButton, setActiveButton] = useState(selected);

  if (activeButton !== selected) {
    setActiveButton(selected);
  }

  const colors = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const activeStyle = [styles.groupButton, {
    backgroundColor: activeBackground,
  }];

  const renderedButtons = buttons.map(button => {
    const isActive = button.value === activeButton;
    const style = isActive ? activeStyle : styles.groupButton;
    const valueStyle = isActive ? styles.contentActiveColor : styles.contentColor;

    return (
      <Touchable
        key={button.value}
        style={style}
        onPress={() => {
          setActiveButton(button.value);
          props.onValueChange(button.value);
        }}>
        {button.icon && <Icon name={button.icon} size={widthDependedPixel(30)} style={valueStyle} />}
        {button.label && <Text style={valueStyle}>{button.label}</Text>}
      </Touchable>
    );
  });

  return <View style={styles.buttonGroup}>{renderedButtons}</View>;
}

const getStyles = colors => (
  StyleSheet.create({
    buttonGroup: {
      flexDirection: 'row',
      alignItems: 'stretch',
      borderRadius: widthDependedPixel(7),
      overflow: 'hidden',
      borderColor: colors.primary,
      borderWidth: 1
    },
    groupButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: widthDependedPixel(35),
    },
    contentColor: {
      color: colors.text,
    },
    contentActiveColor: {
      color: '#fff',
    },
  })
);

export default ButtonGroup;
