import React from 'react';
import { GeoSource } from '../../constants';
import { connect } from 'react-redux';
import GoogleMap from './GoogleMap';
import { setWeather, setLocation } from '../../action';

function GoogleMapContainer(props) {
  const onLocationChange = (source, location = null) => {
    props.setLocation(source, location);
    props.setWeather(props.location);
  };

  return (
    <GoogleMap
      onClick={location => {
        onLocationChange(GeoSource.STATIC, location);
      }}
    />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoogleMapContainer);
