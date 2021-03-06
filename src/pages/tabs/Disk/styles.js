import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/variable';

const styles = StyleSheet.create({
  refreshableListContainer: {
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    width: '100%',
    backgroundColor: colors.bgGray,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  searchInputContainer: {
    backgroundColor: '#fff'
  },
  searchInput: {
    backgroundColor: '#fff'
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
