import { StyleSheet } from 'react-native';
import { colors } from './variable';

const common = StyleSheet.create({
  iconStyle: {
    fontFamily: 'iconfont',
    fontSize: 16
  },
  container: {
    backgroundColor: colors.bgGray,
    flex: 1
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default common;
