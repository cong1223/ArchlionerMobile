import { StyleSheet } from 'react-native';
import myTheme from '@/styles/myTheme';
const styles = StyleSheet.create({
  tabBarContainer: {
    height: 42,
    backgroundColor: '#fff'
  },
  tabBarIndicator: {
    backgroundColor: myTheme.colors.primary
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default styles;
