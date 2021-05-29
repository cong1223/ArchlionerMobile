import { StyleSheet } from 'react-native';
import { screenSize } from '../../utils/tools';
const styles = StyleSheet.create({
  loadingContainer: {
    width: screenSize.width,
    height: screenSize.height,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default styles;
