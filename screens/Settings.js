import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Color } from '../constants';
import { widthPercentageToDP, heightPercentageToDP } from '../utils/units';
import { connect } from 'react-redux';
import TabBar from '../components/TabBar';
import { bottomTabsConfig } from '../navigation/bottomTabs';
import MapView from 'react-native-maps';

class Settings extends React.Component {

  render() {
    return (
      <Fragment>
        <SafeAreaView backgroundColor={this.props.theme.backgroundColor} />
        <SafeAreaView style={{
          backgroundColor: Color.TAB_BAR,
          flex: 1,
        }}>

          <ScrollView contentContainerStyle={{
            flexGrow: 1,
          }}>

            <MapView
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}
              style={{
                height: 400
              }}
            />

          </ScrollView>

          <TabBar config={bottomTabsConfig()} />
          <StatusBar barStyle={'light-content'} backgroundColor={this.props.theme.backgroundColor} />
        </SafeAreaView>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  theme: state.weather.displayTheme
});

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);