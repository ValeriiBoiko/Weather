import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar, Platform, ActivityIndicator, Dimensions } from 'react-native';
import { Color, Action } from '../constants';
import { widthPercentageToDP, heightPercentageToDP } from '../utils/units';
import { connect } from 'react-redux';
import WeatherDisplay from '../components/WeatherDisplay';

import RNLocation from 'react-native-location';
import { fetchWeatherData } from '../utils/api';
import DetailWeatherInfo from '../components/DetailWeatherInfo';
import TabBar from '../components/TabBar';
import { bottomTabsConfig } from '../navigation/bottomTabs';

class DailyForecast extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      availableHeight: null
    }
  }

  render() {
    RNLocation.configure({
      distanceFilter: 1000
    })

    this.requestPermission()
      .then(granted => {
        if (granted) {
          this.latestLocation = RNLocation.getLatestLocation({ timeout: 5000 })
            .then(({ latitude, longitude }) => {
              // fetchWeatherData(latitude, longitude, 'metric')
              //   .then(data => {
              //     this.props.updateWeather(data)
              //   })
              //   .catch(error => console.log(error))

            })
        }
      });

    return (
      <Fragment>
        {/* <StatusBar barStyle={'light-content'} backgroundColor={Color.CYAN} /> */}
        <SafeAreaView backgroundColor={Color.CYAN} />
        <SafeAreaView style={{
          backgroundColor: Color.TAB_BAR,
          flex: 1
        }} onLayout={(e) => {
          this.setState({
            availableHeight: e.nativeEvent.layout.height
          });
        }}>

          {/* <Preloader /> */}

          <ScrollView contentContainerStyle={{
            flexGrow: 1
          }}>


            {
              this.state.availableHeight ? (
                <View style={{
                  flex: 1
                }}>
                  <View style={{
                    backgroundColor: this.props.theme.backgroundColor,
                    height: heightPercentageToDP(63, this.state.availableHeight),
                    overflow: 'hidden',
                  }}>
                    <WeatherDisplay />

                  </View>
                  <DetailWeatherInfo />
                </View>
              ) : null
            }

          </ScrollView>
          <TabBar config={bottomTabsConfig()} />
        </SafeAreaView>
      </Fragment>
    )
  }

  requestPermission = async () => {
    let granted = await RNLocation.checkPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    })

    if (!granted) {
      granted = await RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse"
        }
      })
    }

    return granted;
  }
}

const mapStateToProps = (state) => ({
  theme: state.weather.displayTheme
});

const mapDispatchToProps = (dispatch) => ({
  updateWeather: (data) => {
    dispatch({
      type: Action.UPDATE_WEATHER,
      payload: data
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DailyForecast);