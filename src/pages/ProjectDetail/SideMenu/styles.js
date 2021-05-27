import { StyleSheet } from 'react-native';
import myTheme from '@/styles/myTheme';
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    margin: 12,
    flex: 1
  },
  listItemLabel: {
    fontSize: 14,
    color: myTheme.colors.text
  },
  listItemText: {
    color: myTheme.colors.infoText,
    fontSize: 11
  }
});

export default styles;
