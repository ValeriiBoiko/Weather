import React from 'react';
import { GeoSource } from '../../constants';
import { connect } from 'react-redux';
import GoogleMap from './GoogleMap';
import { setWeather, setLocation } from '../../action';
import PropTypes from 'prop-types';

function GoogleMapContainer(props) {
  const onLocationChange = (source, location = null) => {
    props.setLocation(source, location)
  };

  return (
    <GoogleMap
      marker={props.marker}
      location={props.location}
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

GoogleMapContainer.propTypes = {
  location: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  }),
  marker: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  }),
  setLocation: PropTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoogleMapContainer);
