import { StyleSheet } from 'react-native';
import { screenSize } from '../../../utils/tools';

const styles = StyleSheet.create({
  container: {
    width: screenSize.width,
    height: screenSize.height,
    alignItems: 'center'
  },
  iconStyle: {
    fontFamily: 'iconfont',
    fontSize: 24,
    marginTop: 10,
    marginLeft: 10
  }
});

export default styles;
