module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react-hooks/exhaustive-deps': 0 // hooks依赖项可以传空数组
  }
};
