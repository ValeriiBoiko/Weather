import React, { useEffect } from 'react';
import { GeoSource, ColorScheme } from '../../constants';
import { heightPercentageToDP } from '../../utils/units';
import { connect } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyle from '../../styles/map';

function GoogleMap (props) {
    useEffect(() => {
        this.map.animateCamera({
            center: props.location,
            heading: 0,
            pitch: 0
        })
    });

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            customMapStyle={props.colorScheme === ColorScheme.DARK ? mapStyle : null}
            ref={(map) => this.map = map}
            initialRegion={{
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
                latitude: props.location.latitude,
                longitude: props.location.longitude
            }}
            style={{
                height: heightPercentageToDP(30)
            }}

            onPress={({ nativeEvent }) => {
                props.onClick(nativeEvent.coordinate);
            }}
        >
            {
                props.marker && (
                    <Marker
                        coordinate={props.marker}
                        title={'Your location?'}
                    />
                )
            }
        </MapView>
    )
}

const mapStateToProps = (state) => ({
    marker: state.location,
    location: state.location,
    colorScheme: state.colorScheme,
});

export default connect(mapStateToProps)(GoogleMap);