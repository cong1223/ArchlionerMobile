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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitleText: {
    fontSize: 16,
    color: '#FFF'
  },
  flex: {
    display: 'flex'
  },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  alignCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mt8: {
    marginTop: 8
  },
  mr8: {
    marginRight: 8
  }
});

export default common;
