/**
 * @format
 */

import React from 'react';
import DailyForecast from './screens/DailyForecast';
import WeeklyForecast from './screens/WeeklyForecast';
import { Navigation } from 'react-native-navigation'
import { createStore } from 'redux';
import rootReducer from './reducers'
import { Provider } from 'react-redux';
import Icon from './ui/Icon/Icon';
import { heightDependedPixel } from './utils/units';
import { bottomTabsConfig } from './navigation/bottomTabs';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

let persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

persistStore(store, {}, bootstrapNavigation);

function ReduxProvider(Component) {
    return (props) => (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    );
}

function bootstrapNavigation() {
    console.log(0);
    Navigation.registerComponent(`screen.DailyForecast`, () => ReduxProvider(DailyForecast), () => DailyForecast);
    Navigation.registerComponent(`screen.WeeklyForecast`, () => ReduxProvider(WeeklyForecast), () => WeeklyForecast);
    console.log(1);
    
    Navigation.events().registerAppLaunchedListener(() => {
        console.log(2);
        Navigation.setDefaultOptions({
            bottomTabs: {
                visible: false,
            }
        })
        
        Promise.all([
            Icon.getImageSource('day', 35),
            Icon.getImageSource('week', heightDependedPixel(35)),
        ])
        .then((sources) => {
            
            console.log(3);
                Navigation.setRoot({
                    root: {
                        bottomTabs: bottomTabsConfig(sources)
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
}

// bootstrapNavigation();