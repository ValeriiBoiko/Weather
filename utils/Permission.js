import RNLocation from 'react-native-location';

class Permission {
  static parmissionGranted = async () => {
    const granted = RNLocation.checkPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    });

    return granted;
  };

  static requestPermission = async () => {
    const granted = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    });

    return granted;
  };
}

export default Permission;
