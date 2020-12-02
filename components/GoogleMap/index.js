import React, { useEffect, useRef, useState } from 'react';
import { ColorScheme } from '../../constants';
import { heightPercentageToDP } from '../../utils/units';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { GeoSource } from '../../constants';
import { connect } from 'react-redux';
import { setWeather, setLocation } from '../../action';

function GoogleMapContainer(props) {
  const map = useRef(null);
  const [region, setRegion] = useState({
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
    latitude: props.location.latitude,
    longitude: props.location.longitude
  });

  useEffect(() => {
    setRegion({
      ...region,
      latitude: props.location.latitude,
      longitude: props.location.longitude
    })

    map.current.animateCamera({
      center: props.location,
      heading: 0,
      pitch: 0
    });
  }, [props.location]);


  const onPress = ({ nativeEvent }) => {
    props.setLocation(GeoSource.STATIC, nativeEvent.coordinate)
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      showsTraffic={false}
      loadingEnabled={true}
      customMapStyle={props.colorScheme === ColorScheme.DARK ? mapStyle : null}
      ref={map}
      initialRegion={region}
      region={region}
      onRegionChangeComplete={setRegion}
      style={{ height: heightPercentageToDP(40) }}
      onPoiClick={onPress}
      onPress={onPress}>
      <Marker coordinate={props.marker} />
    </MapView>
  );
}

const mapStateToProps = state => ({
  marker: state.location,
  location: state.location,
  colorScheme: state.colorScheme,
});

const mapDispatchToProps = dispatch => ({
  setLocation: (source, location) => dispatch(setLocation(source, location)),
  setWeather: (location, unit, lang) => dispatch(setWeather(location, unit, lang)),
});

GoogleMapContainer.propTypes = {
  location: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  }),
  marker: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  }),
  setLocation: PropTypes.func,
  colorScheme: PropTypes.oneOf([ColorScheme.DARK, ColorScheme.LIGHT])
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoogleMapContainer);
