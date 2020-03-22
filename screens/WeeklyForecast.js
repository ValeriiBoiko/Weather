import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar, Platform, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { Color, Action } from '../constants';
import { connect } from 'react-redux';

import RNLocation from 'react-native-location';
import TabBar from '../components/TabBar';
import { bottomTabsConfig } from '../navigation/bottomTabs';
import { common } from '../styles/common';
import { heightPercentageToDP } from '../utils/units';
import WeatherDisplay from '../components/WeatherDisplay';
import DailyShortForecast from '../components/DaillyLineForecast';

class WeeklyForecast extends React.Component {

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
              // console.log('call')
            })
        }
      });

    return (
      <View style={{
        flex: 1
      }}>
        <SafeAreaView style={{
          backgroundColor: this.props.theme.backgroundColor
        }}/>
        <SafeAreaView style={{
          backgroundColor: Color.WHITE,
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
                <View style={common.flex}>
                  <View style={{
                    backgroundColor: this.props.theme.backgroundColor,
                    height: heightPercentageToDP(40, this.state.availableHeight),
                  }}>
                    <WeatherDisplay />
                  </View>


                  <DailyShortForecast style={styles.dailyForecast}/>
                  <DailyShortForecast style={styles.dailyForecast}/>
                  <DailyShortForecast style={styles.dailyForecast}/>
                  <DailyShortForecast style={styles.dailyForecast}/>
                  <DailyShortForecast style={styles.dailyForecast}/>
                </View>
              ) : null
            }

          </ScrollView>
          <TabBar config={bottomTabsConfig()} />
        </SafeAreaView>
        <SafeAreaView style={{
          backgroundColor: Color.TAB_BAR
        }}/>
        <StatusBar barStyle={'light-content'} backgroundColor={this.props.theme.backgroundColor} />
      </View>
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

const styles = StyleSheet.create({
  dailyForecast: {
    borderBottomColor: Color.TAB_BAR,
    borderBottomWidth: 1,
    marginHorizontal: '5%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => ({
  theme: state.weather.displayTheme, 
  weather: state.weather.list
});

const mapDispatchToProps = (dispatch) => ({
  updateWeather: (data) => {
    dispatch({
      type: Action.UPDATE_WEATHER,
      payload: data
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyForecast);