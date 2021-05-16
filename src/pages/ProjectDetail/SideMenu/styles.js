import { StyleSheet } from 'react-native';
import { screenSize } from '../../../utils/tools';
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    margin: 12,
    flex: 1
  },
  title: {
    marginTop: 15,
    marginBottom: 10,
    color: '#444',
    fontSize: 14
  },
  swithBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  switchText: {
    fontSize: 14,
    color: '#222'
  },
  link: {
    padding: 5,
    color: '#892853'
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginTop: 12,
    marginBottom: 6
  }
});

export default styles;
