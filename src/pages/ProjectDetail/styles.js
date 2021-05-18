import { StyleSheet } from 'react-native';
import { colors } from '../../styles/variable';
const styles = StyleSheet.create({
  buttonGroup: {
    height: 28,
    borderColor: colors.themeColor
  },
  buttonGroupText: {
    color: colors.themeColor
  },
  buttonGroupTextActive: {
    color: '#fff'
  },
  searchBarContainer: {
    width: '100%',
    backgroundColor: colors.bgGray,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  searchInputContainer: {
    backgroundColor: '#fff',
    height: 28
  },
  searchInput: {
    backgroundColor: '#fff',
    fontSize: 14
  }
});

export default styles;
