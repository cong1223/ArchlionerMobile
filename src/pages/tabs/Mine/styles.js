import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/variable';

const styles = StyleSheet.create({
  userInfoContainer: {
    height: 215,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    marginTop: 40
  },
  userName: {
    color: '#262626',
    fontSize: 16,
    marginTop: 11,
    marginBottom: 4
  },
  curEnterpriseName: {
    fontSize: 14,
    color: '#595959',
    marginBottom: 5,
    lineHeight: 22
  },
  changeEntBtn: {
    textDecorationLine: 'underline',
    color: colors.themeColor,
    fontSize: 12
  }
});

export default styles;
