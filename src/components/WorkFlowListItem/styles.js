import { StyleSheet } from 'react-native';
import myTheme from '../../styles/myTheme';
import { colors } from '../../styles/variable';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 11
  },
  actNameText: {
    fontSize: 14,
    paddingLeft: 14,
    color: myTheme.colors.text
  },
  avatarOverlayContainer: {
    backgroundColor: '#595959'
  },
  avatarTitleText: {
    fontSize: 12
  },
  listItemTitle: {
    color: myTheme.colors.text,
    fontSize: 14,
    lineHeight: 20
  },
  listItemSubTitle: {
    color: myTheme.colors.infoText,
    fontSize: 11,
    lineHeight: 16
  }
});
export default styles;
