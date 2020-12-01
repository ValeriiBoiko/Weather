import React, { useEffect, useRef } from 'react';
import { ColorScheme } from '../../constants';
import { heightPercentageToDP } from '../../utils/units';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';

import mapStyle from '../../styles/map';

function GoogleMap(props) {
  const map = useRef(null);
  const style = {
    height: heightPercentageToDP(30)
  };

  const regionConfig = {
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
    latitude: props.location.latitude,
    longitude: props.location.longitude
  };

  useEffect(() => {
    map.current.animateCamera({
      center: props.location,
      heading: 0,
      pitch: 0
    });
  });

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      customMapStyle={props.colorScheme === ColorScheme.DARK ? mapStyle : null}
      ref={map}
      initialRegion={regionConfig}
      region={regionConfig}
      style={style}
      onPress={({ nativeEvent }) => {
        props.onClick(nativeEvent.coordinate);
      }}>
      {props.marker && (
        <Marker coordinate={props.marker} title={'Your location?'} />
      )}
    </MapView>
  );
}

GoogleMap.propTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }).isRequired,
  marker: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }),
  colorScheme: PropTypes.oneOf([ColorScheme.DARK, ColorScheme.LIGHT]),
  onClick: PropTypes.func
};

export default GoogleMap;
