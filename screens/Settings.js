import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View, StyleSheet } from 'react-native';
import { Color, GeoSource } from '../constants';
import { heightPercentageToDP, widthDependedPixel } from '../utils/units';
import { connect } from 'react-redux';
import TabBar from '../components/TabBar';
import { bottomTabsConfig } from '../navigation/bottomTabs';
import MapView, { Marker } from 'react-native-maps';
import { APIHelper } from '../utils/api';
import { updateWeatherAction, updateLocationUsage, updateLocationAction, updateUnitAction, updateLocationSourceAction } from '../action';
import { common } from '../styles/common';
import ButtonGroup from '../ui/ButtonGroup';
import RNLocation from 'react-native-location';
import data from '../localization.json';


class Settings extends React.Component {

  render() {
    const locationButtons = [
      {
        label: 'GPS',
        value: GeoSource.GPS
      },
      {
        label: 'IP Address',
        value: GeoSource.IP
      },
      {
        label: 'Static',
        value: GeoSource.STATIC
      },
    ]
    const unitsButtons = [
      {
        value: 'metric',
        label: data.units.metric[this.props.lang],
      },
      {
        value: 'imperial',
        label: data.units.imperial[this.props.lang],
      }
    ]

    return (
      <Fragment>
        <SafeAreaView style={{
          backgroundColor: Color.TAB_BAR,
          flex: 1,
        }}>

          <ScrollView contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Color.WHITE,
          }}>

            <View style={styles.settingRow}>
              <View style={styles.settingTitle}>
        <Text style={styles.settingTitleText}>{data.phrase.unitsFormat[this.props.lang]}</Text>
              </View>
              <ButtonGroup buttons={unitsButtons} onValueChange={this.props.updateUnitSystem} selected={this.props.unitSystem} />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingTitle}>
                <Text style={styles.settingTitleText}>{data.phrase.locationSource[this.props.lang]}</Text>
              </View>
              <ButtonGroup buttons={locationButtons} onValueChange={this.onHandleSourceChange} selected={this.props.locationSource} />
            </View>

            {
              this.props.useStaticLocation ? (
                <MapView
                  ref={(map) => this.map = map}
                  initialRegion={{
                    latitude: this.props.marker.latitude,
                    longitude: this.props.marker.longitude,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                  }}
                  style={{
                    height: heightPercentageToDP(30)
                  }}

                  onPress={({ nativeEvent }) => {
                    this.props.updateLocationSource(GeoSource.STATIC);
                    this.props.updateLocation(nativeEvent.coordinate);

                    // APIHelper.fetchWeatherData(nativeEvent.coordinate.latitude, nativeEvent.coordinate.longitude, 'metric')
                    //   .then(data => {
                    //     this.props.updateWeather(data)
                    //   })
                    // .catch(error => console.log(error))
                  }}
                >
                  {
                    this.props.marker ?
                      <Marker
                        coordinate={this.props.marker}
                        title={'Your location?'}
                      /> : null
                  }
                </MapView>
              ) : null
            }

            <View style={styles.settingRow}>
              <View style={styles.settingTitle}>
                <Text style={styles.settingTitleText}>Preferrable language: English</Text>
              </View>
              <ButtonGroup buttons={unitsButtons} onValueChange={this.onHandleSourceChange} selected={this.props.locationSource} />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingTitle}>
                <Text style={styles.settingTitleText}>Color mode: Light</Text>
              </View>
              <ButtonGroup buttons={unitsButtons} onValueChange={this.onHandleSourceChange} selected={this.props.locationSource} />
            </View>

          </ScrollView>

          <TabBar config={bottomTabsConfig()} />
          <StatusBar barStyle={'light-content'} backgroundColor={this.props.theme.backgroundColor} />
        </SafeAreaView>
        
      </Fragment>
    )
  }

  checkPermissions = async () => {
    let granted = await RNLocation.checkPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    })

    return granted
  }

  onHandleSourceChange = async (source) => {
    this.props.updateLocationSource(source);
    let location = null;
    APIHelper.fetchIPData();

    // switch (source) {
    //   case GeoSource.IP:
    //     location = await APIHelper.fetchIPData();
    //     break;

    //   case GeoSource.GPS:
    //     location = await RNLocation.getLatestLocation({timeout: 5000});
    //     break;
    // }

    // console.log(location, 'hello')

    // let location = await getLocation;

    // if (getLocation) {
    //   getLocation
    //     .then(coord => {
    //       this.map.animateCamera({
    //         center: coord,
    //         heading: 0,
    //         pitch: 0
    //       })
    //       this.props.updateLocation(coord)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // }

    // APIHelper.fetchWeatherData()
  }
}


const styles = StyleSheet.create({
  settingRow: {
    marginHorizontal: '4%',
    marginVertical: widthDependedPixel(15),
  },
  settingTitle: {
    borderBottomColor: Color.DARK_BLUE,
    borderBottomWidth: 1,
    paddingBottom: widthDependedPixel(5),
    marginBottom: widthDependedPixel(15),
  },
  settingTitleText: {
    ...common.largerText,
  },
  label: {
    ...common.largerText,
    flex: 1,
    paddingRight: widthDependedPixel(20)
  },
})

const mapStateToProps = (state) => ({
  theme: state.displayTheme,
  marker: state.location,
  useStaticLocation: true,
  unitSystem: state.unitSystem,
  locationSource: state.locationSource,
  lang: state.lang
});

const mapDispatchToProps = (dispatch) => ({
  updateLocation: coord => dispatch(updateLocationAction(coord)),
  updateWeather: data => dispatch(updateWeatherAction(data)),
  toggleLocationUsage: useStaticLocation => dispatch(updateLocationUsage(useStaticLocation)),
  updateUnitSystem: value => dispatch(updateUnitAction(value)),
  updateLocationSource: value => dispatch(updateLocationSourceAction(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);