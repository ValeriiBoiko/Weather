module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    'production': {
      'plugins': [
        [
          'transform-react-remove-prop-types', {
            'mode': 'remove',
            'removeImport': true
          }
        ]
      ]
    }
  }
};
