import { StyleSheet } from 'react-native';
import { colors } from '../../styles/variable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: colors.themeColor,
    marginBottom: 40
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },
  inputText: {
    height: 50,
    color: '#262626'
  },
  forgot: {
    color: colors.themeColor,
    fontSize: 11
  },
  loginBtn: {
    width: '80%',
    backgroundColor: colors.themeColor,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: '#fff'
  },
  signUpText: {
    color: colors.themeColor
  }
});

export default styles;
