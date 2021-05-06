import { StyleSheet } from 'react-native';
import { screenSize } from '../../../utils/tools';
import { colors } from '../../../styles/variable';

const styles = StyleSheet.create({
  container: {
    width: screenSize.width,
    height: '100%'
  },
  separator: {
    height: 1
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
  flatListContainer: {
    width: '100%',
    flex: 1
  },
  listItem: {
    width: screenSize.width / 2,
    height: 220,
    backgroundColor: '#fff',
    borderRightColor: colors.bgGray,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  projectName: {
    fontSize: 16,
    color: '#262626',
    lineHeight: 24,
    marginTop: 30,
    marginBottom: 2
  },
  createTimeText: {
    fontSize: 12,
    color: '#8c8c8c',
  }
});

export default styles;
