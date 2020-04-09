import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, View, StatusBar } from 'react-native';
import { Color, Action } from '../constants';
import { heightPercentageToDP } from '../utils/units';
import { connect } from 'react-redux';
import WeatherDisplay from '../components/WeatherDisplay';

import RNLocation from 'react-native-location';
import { APIHelper } from '../utils/api';
import DetailWeatherInfo from '../components/DetailWeatherInfo';
import TabBar from '../components/TabBar';
import { bottomTabsConfig } from '../navigation/bottomTabs';
import { updateWeatherAction } from '../action';

class DailyForecast extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      availableHeight: null
    }
  }

  componentDidMount() {
    RNLocation.configure({
      distanceFilter: 1000
    })

    this.requestPermission()
      .then(granted => {
        if (granted) {
          this.latestLocation = RNLocation.getLatestLocation({ timeout: 5000 })
            .then(({ latitude, longitude }) => {
              // APIHelper.fetchWeatherData(latitude, longitude, 'metric')
              //   .then(data => {
              //     this.props.updateWeather(data)
              //   })
              //   .catch(error => console.log(error))
            })
            .catch(error => console.log('Error in geolocation'))
        }
      });
  }

  render() {


    return (
      <Fragment>
        <SafeAreaView backgroundColor={this.props.theme.backgroundColor} />
        <SafeAreaView style={{
          backgroundColor: Color.TAB_BAR,
          flex: 1,
        }} onLayout={(e) => {
          this.setState({
            availableHeight: e.nativeEvent.layout.height
          });
        }}>
          <ScrollView contentContainerStyle={{
            flexGrow: 1,
          }}>

            {
              this.state.availableHeight ? (
                <View style={{
                  flex: 1
                }}>
                  <View style={{
                    backgroundColor: this.props.theme.backgroundColor,
                    height: heightPercentageToDP(63, this.state.availableHeight),
                    overflow: 'hidden'
                  }}>
                    <WeatherDisplay />

                  </View>
                  <DetailWeatherInfo />
                </View>
              ) : null
            }

          </ScrollView>
          <TabBar config={bottomTabsConfig()} />
          <StatusBar barStyle={'light-content'} backgroundColor={this.props.theme.backgroundColor} />
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
  theme: state.displayTheme
});

const mapDispatchToProps = (dispatch) => ({
  updateWeather: data => dispatch(updateWeatherAction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(DailyForecast);