import React, { useEffect } from 'react';
import { Color } from '../constants';
import { connect, batch } from 'react-redux';
import ButtonGroup from '../components/ButtonGroup';
import { setLanguageAction, setUnitAction, setWeather, setLocation, setColorSchemeAction } from '../action';
import data from '../localization.json';
import GoogleMap from '../components/GoogleMap';
import ScreenWrapper from '../components/ScreenWrapper';
import SettingRow from '../components/SettingRow';
import { getLocationSources, getUnits, getLanguages, getColorSchemes } from '../settingsConfig';

function Settings(props) {
  const locationButtons = getLocationSources(props.lang);
  const unitsButtons = getUnits(props.lang);
  const languageButtons = getLanguages(props.lang);
  const colorButtons = getColorSchemes(props.lang);

  const onLanguageChange = lang => {
    batch(() => {
      props.setLanguage(lang);
      props.setWeather(props.location, props.unitSystem, lang);
    });
  };

  const onUnitChange = unitSystem => {
    batch(() => {
      props.setUnitSystem(unitSystem);
      props.setWeather(props.location, unitSystem, props.lang);
    });
  };

  const onLocationChange = async source => {
    props.setLocation(source).then(location => {
      props.setWeather(location, props.unitSystem, props.lang);
    });
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

      <SettingRow title={data.phrase.languagelabel[props.lang]}>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
