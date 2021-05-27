import { DefaultTheme } from '@react-navigation/native';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0784ff',
    bgGray: '#efeff3',
    text: '#262626',
    infoText: '#8c8c8c'
  }
};

export default MyTheme;
