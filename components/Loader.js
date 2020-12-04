import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import useTheme from '../theming/useTheme';
import Icon from './Icon';

function Loader({ isVisible, label, spinnerColor, ...props }) {
  const colors = useTheme();
  const animated = useRef(new Animated.Value(0)).current;
  const styles = useMemo(() => getStyles(colors), [colors]);

  function runDirect() {
    Animated.loop(
      Animated.timing(
        animated,
        {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
          easing: Easing.linear,
        }
      )
    ).start()
  }

  useEffect(() => {
    if (isVisible) {
      runDirect();
    }
  }, [isVisible])

  const rotateDeg = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    isVisible ? (
      <View {...props} style={[styles.container, props.style]}>
        <Animated.View style={[
          styles.loader,
          {
            transform: [
              { rotate: rotateDeg }
            ]
          }
        ]}>
          <Icon name={'spin1'} size={50} color={colors.primary} />
        </Animated.View>
        <Text style={styles.label}>{label}</Text>
      </View>
    ) : null
  )
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loader: {
    marginBottom: 8,
  },
  loaderItem: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  label: {
    color: colors.text,
    fontSize: 16
  }
})

Loader.defaultProps = {
  isVisible: false,
  label: '',
  spinnerColor: '#fff',
}

export default Loader