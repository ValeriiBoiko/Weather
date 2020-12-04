import React from 'react';
import DailyForecast from './screens/DailyForecast';
import WeeklyForecast from './screens/WeeklyForecast';
import { Navigation } from 'react-native-navigation'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'
import { Provider } from 'react-redux';
import { heightDependedPixel } from './utils/units';
import { bottomTabsConfig } from './navigation/bottomTabs';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Settings from './screens/Settings';
import thunk from 'redux-thunk';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import Icon from './components/Icon';

let persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store, {}, bootstrapNavigation);

function withProviders(Component) {
  return props => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Component {...props} />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

function bootstrapNavigation() {
  Navigation.registerComponent('screen.DailyForecast', () => withProviders(DailyForecast), () => DailyForecast);
  Navigation.registerComponent('screen.WeeklyForecast', () => withProviders(WeeklyForecast), () => WeeklyForecast);
  Navigation.registerComponent('screen.Settings', () => withProviders(Settings), () => Settings);

  Navigation.setDefaultOptions({
    bottomTabs: {
      visible: false,
    },
  });

  Promise.all([
    Icon.getImageSource('day', heightDependedPixel(35)),
    Icon.getImageSource('week', heightDependedPixel(35)),
    Icon.getImageSource('settings', heightDependedPixel(35)),
  ])
    .then(sources => {
      Navigation.setRoot({
        root: {
          bottomTabs: bottomTabsConfig(sources),
        },
      });
    })
    .catch(error => console.log(error));
}
