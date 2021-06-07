import { StyleSheet } from 'react-native';
import { colors } from '../../styles/variable';

const styles = StyleSheet.create({
  container: {
    flex: 1
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
