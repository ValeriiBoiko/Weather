import { GeoSource, ColorScheme, Unit, Language } from './constants';
import data from './localization';

export const getLocationSources = lang => [
  {
    label: data.location.gps[lang],
    value: GeoSource.GPS,
  },
  {
    label: data.location.ip[lang],
    value: GeoSource.IP,
  },
  {
    label: data.location.static[lang],
    value: GeoSource.STATIC,
  },
];

export const getUnits = lang => [
  {
    value: Unit.METRIC,
    label: data.unitSystem.metric[lang],
  },
  {
    value: Unit.IMPERIAL,
    label: data.unitSystem.imperial[lang],
  },
];

export const getLanguages = lang => [
  {
    value: Language.UA,
    label: data.language[lang][Language.UA],
  },
  {
    value: Language.EN,
    label: data.language[lang][Language.EN],
  },
];

export const getColorSchemes = lang => [
  {
    value: ColorScheme.DARK,
    label: data.theme.dark[lang],
  },
  {
    value: ColorScheme.LIGHT,
    label: data.theme.light[lang],
  },
];
