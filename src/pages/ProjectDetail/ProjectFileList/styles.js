import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/variable';
const styles = StyleSheet.create({
  container: {
    flex: 1
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
  },
  listItemTitle: {
    color: colors.primaryFontColor,
    fontSize: 14,
    lineHeight: 20
  },
  listItemSubTitle: {
    color: colors.infoFontColor,
    fontSize: 11,
    lineHeight: 16
  }
});
export default styles;
