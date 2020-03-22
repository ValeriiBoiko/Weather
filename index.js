/**
 * @format
 */

import React from 'react';
import DailyForecast from './screens/DailyForecast';
import WeeklyForecast from './screens/WeeklyForecast';
import { Navigation } from 'react-native-navigation'
import { Color, Font } from './constants';
import { createStore } from 'redux';
import rootReducer from './reducers'
import { Provider } from 'react-redux';
import Icon from './ui/Icon/Icon';
import { heightDependedPixel } from './utils/units';
import { bottomTabsConfig } from './navigation/bottomTabs';

let store;

function ReduxProvider(Component) {
    store = store || createStore(rootReducer);

    return (props) => (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    )
}

Navigation.registerComponent(`screen.DailyForecast`, () => ReduxProvider(DailyForecast), () => DailyForecast);
Navigation.registerComponent(`screen.WeeklyForecast`, () => ReduxProvider(WeeklyForecast), () => WeeklyForecast);


Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
        bottomTabs: {
            visible: false,
        }
    })

    Promise.all([
        Icon.getImageSource('day', 35),
        Icon.getImageSource('week', heightDependedPixel(35)),
    ]).then((sources) => {

        Navigation.setRoot({
            root: {
                bottomTabs: bottomTabsConfig(sources)
            }
        });
    })
    .catch(error => {
        console.log('Error in navigation');
    });


});
