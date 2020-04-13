import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View, StyleSheet } from 'react-native';
import { Color, GeoSource } from '../constants';
import { heightPercentageToDP, widthDependedPixel } from '../utils/units';
import { connect, batch } from 'react-redux';
import TabBar from '../components/TabBar';
import { bottomTabsConfig } from '../navigation/bottomTabs';
import MapView, { Marker } from 'react-native-maps';
import { APIHelper } from '../utils/api';
import { updateWeatherAction, updateLocationUsage, updateLocationAction, updateUnitAction, updateLocationSourceAction, setWeather, setLocation } from '../action';
import { common } from '../styles/common';
import ButtonGroup from '../ui/ButtonGroup';
import RNLocation from 'react-native-location';
import data from '../localization.json';

class Settings extends React.PureComponent {

  render() {
    const locationButtons = [
      {
        label: data.location.gps[this.props.lang],
        value: GeoSource.GPS
      },
      {
        label: data.location.ip[this.props.lang],
        value: GeoSource.IP
      },
      {
        label: data.location.static[this.props.lang],
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

    const languageButtons = [
      {
        value: 'en',
        label: data.language[this.props.lang]['ru'],
      },
      {
        value: 'ru',
        label: data.language[this.props.lang]['en'],
      }
    ]

    // console.log(this.props.marker)

    return (
      <Fragment>

        <SafeAreaView style={{
          flex: 1,
        }}>

          <ScrollView contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Color.WHITE,
          }}>
            {
          this.props.location ? (
            <MapView
              ref={(map) => this.map = map}
              initialRegion={{
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
                latitude: this.props.location.latitude,
                longitude: this.props.location.longitude
              }}
              style={{
                height: heightPercentageToDP(30)
              }}

              onPress={({ nativeEvent }) => {
                this.onLocationChange(GeoSource.STATIC, nativeEvent.coordinate)
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
                <Text style={styles.settingTitleText}>{data.phrase.locationSource[this.props.lang]}</Text>
              </View>
              <ButtonGroup buttons={locationButtons} onValueChange={this.onLocationChange} selected={this.props.locationSource} />
            </View>

            {/* <View style={styles.settingRow}>
              <View style={styles.settingTitle}>
                <Text style={styles.settingTitleText}>{data.phrase.unitsFormat[this.props.lang]}</Text>
              </View>
              <ButtonGroup buttons={unitsButtons} onValueChange={this.props.updateUnitSystem} selected={this.props.unitSystem} />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingTitle}>
                <Text style={styles.settingTitleText}>{data.phrase.languagelabel[this.props.lang]}</Text>
              </View>
              <ButtonGroup buttons={languageButtons} onValueChange={this.onLocationChange} selected={this.props.lang} />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingTitle}>
                <Text style={styles.settingTitleText}>{data.phrase.themeLabel[this.props.lang]}</Text>
              </View>
              <ButtonGroup buttons={unitsButtons} onValueChange={this.onLocationChange} selected={this.props.locationSource} />
            </View> */}

          </ScrollView>

          <TabBar config={bottomTabsConfig()} />
        </SafeAreaView>

        <SafeAreaView style={{
          backgroundColor: Color.TAB_BAR
        }} />
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

  componentDidUpdate () {
    this.map.animateCamera({
      center: this.props.location,
      heading: 0,
      pitch: 0
    })
  }

  onLocationChange = (source, location = null) => {

    this.props.setLocation(source, location);
    // this.props.setWeather(location, this.props.unitSystem, this.props.lang);
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
  location: state.location,
  lang: state.lang
});

const mapDispatchToProps = (dispatch) => ({
  // updateLocation: coord => dispatch(updateLoca),
  setLocation: (source, location) => dispatch(setLocation(source, location)),
  setWeather: (location, unit, lang) => dispatch(setWeather(location, unit, lang)),
  toggleLocationUsage: useStaticLocation => dispatch(updateLocationUsage(useStaticLocation)),
  updateUnitSystem: value => dispatch(updateUnitAction(value)),
  updateLocationSource: value => dispatch(updateLocationSourceAction(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);