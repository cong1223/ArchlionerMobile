import { DefaultTheme } from '@react-navigation/native';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0784ff',
    bgGray: '#efeff3',
    text: '#262626',
    infoText: '#909399'
  }
};

export default MyTheme;
