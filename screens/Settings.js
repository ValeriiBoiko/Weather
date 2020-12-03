import React from 'react';
import { Color, ColorScheme, GeoSource, Language, Unit } from '../constants';
import { batch, connect } from 'react-redux';
import ButtonGroup from '../components/ButtonGroup';
import { setLanguageAction, setUnitAction, setWeather, setLocation, setColorSchemeAction } from '../action';
import data from '../localization.json';
import GoogleMap from '../components/GoogleMap';
import ScreenWrapper from '../components/ScreenWrapper';
import SettingRow from '../components/SettingRow';
import { getLocationSources, getUnits, getLanguages, getColorSchemes } from '../settingsConfig';
import PropTypes from 'prop-types';
import { Alert, Linking } from 'react-native';
import Permission from '../utils/Permission';

function Settings(props) {
  const locationButtons = getLocationSources(props.lang);
  const unitsButtons = getUnits(props.lang);
  const languageButtons = getLanguages(props.lang);
  const colorButtons = getColorSchemes(props.lang);

  const onLanguageChange = lang => {
    batch(() => {
      props.setLanguage(lang);
      props.setWeather(props.location, props.unitSystem, lang)
    })
  };

  const onUnitChange = unitSystem => {
    batch(() => {
      props.setUnitSystem(unitSystem);
      props.setWeather(props.location, unitSystem, props.lang)
    })
  };

  const onLocationChange = async source => {
    if (source === GeoSource.GPS) {
      if (!await Permission.parmissionGranted() && !await Permission.requestGeoPermission()) {
        Alert.alert(
          data.phrase.geoAlertTitle[props.lang],
          data.phrase.geoAlertMessage[props.lang],
          [
            {
              text: data.actions.cancel[props.lang],
              style: 'cancel'
            },
            { text: data.actions.ok[props.lang], onPress: Linking.openSettings }
          ]
        )
      }
    }

    props.setLocation(source);
  };

  return (
    <ScreenWrapper
      headerColor={Color[props.colorScheme].WHITE}
      bodyColor={Color[props.colorScheme].WHITE}
      footerColor={Color[props.colorScheme].TAB_BAR}>
      <GoogleMap />

      <SettingRow title={data.phrase.locationSource[props.lang]}>
        <ButtonGroup
          buttons={locationButtons}
          onValueChange={onLocationChange}
          selected={props.locationSource}
        />
      </SettingRow>

      <SettingRow title={data.phrase.unitsFormat[props.lang]}>
        <ButtonGroup
          buttons={unitsButtons}
          onValueChange={onUnitChange}
          selected={props.unitSystem}
        />
      </SettingRow>

      <SettingRow title={data.phrase.languageLabel[props.lang]}>
        <ButtonGroup
          buttons={languageButtons}
          onValueChange={onLanguageChange}
          selected={props.lang}
        />
      </SettingRow>

      <SettingRow title={data.phrase.themeLabel[props.lang]}>
        <ButtonGroup
          buttons={colorButtons}
          onValueChange={props.setColorScheme}
          selected={props.colorScheme}
        />
      </SettingRow>
    </ScreenWrapper>
  );
}

const mapStateToProps = state => ({
  marker: state.location,
  unitSystem: state.unitSystem,
  locationSource: state.locationSource,
  location: state.location,
  lang: state.lang,
  colorScheme: state.colorScheme,
});

const mapDispatchToProps = dispatch => ({
  setLocation: source => dispatch(setLocation(source)),
  setWeather: (location, unit, lang) => dispatch(setWeather(location, unit, lang)),
  setUnitSystem: value => dispatch(setUnitAction(value)),
  setLanguage: lang => dispatch(setLanguageAction(lang)),
  setColorScheme: color => dispatch(setColorSchemeAction(color)),
});

Settings.propTypes = {
  lang: PropTypes.oneOf([Language.EN, Language.UA]).isRequired,
  colorScheme: PropTypes.oneOf([ColorScheme.DARK, ColorScheme.LIGHT]).isRequired,
  unitSystem: PropTypes.oneOf([Unit.IMPERIAL, Unit.METRIC]).isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  locationSource: PropTypes.oneOf([GeoSource.GPS, GeoSource.IP, GeoSource.STATIC]).isRequired,
  setLocation: PropTypes.func.isRequired,
  setWeather: PropTypes.func.isRequired,
  setUnitSystem: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  setColorScheme: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
