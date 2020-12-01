import RNLocation from 'react-native-location';

class Permission {
  static parmissionGranted() {
    return new Promise(resolve => {
      RNLocation.checkPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse'
        }
      })
        .then(granted => resolve(granted))
        .catch(() => resolve(false));
    });
  }

  static async requestGeoPermission() {
    const granted = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse'
      },
    });

    return granted;
  }
}

export default Permission;
