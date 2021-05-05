import React, { useState, useRef, useEffect } from 'react';
import { Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './styles';
import UserService from '../../services/UserService';
import { Input } from 'react-native-elements';
import { WToast } from 'react-native-smart-tip';
import Storage from '../../utils/storage';
import keys from '../../config/keys';
import SplashScreen from 'react-native-splash-screen';

const Login = props => {
  const { navigation } = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    UserService.login(userName, password)
      .then(res => {
        Storage.setItem(keys.LOGIN_PARAMS, { userName, password });
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tab' }]
        });
      })
      .catch(e => {
        WToast.show({ data: e.message, position: WToast.position.CENTER });
      });
  };

  useEffect(() => {
    Storage.getItem(keys.LOGIN_PARAMS).then(value => {
      if (value) {
        setUserName(value.userName);
        setPassword(value.password);
        setTimeout(() => {
          UserService.login(value.userName, value.password).then(res => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Tab' }]
            });
            SplashScreen.hide();
          });
        }, 0);
      } else {
        SplashScreen.hide();
      }
    });
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/img/loginPageBg.png')}
      style={styles.container}
    >
      <Text style={styles.logo}>营造狮</Text>
      <Input
        value={userName}
        containerStyle={styles.inputView}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        placeholder="手机号"
        onChangeText={text => setUserName(text)}
      />
      <Input
        value={password}
        secureTextEntry={true}
        containerStyle={styles.inputView}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        placeholder="密码"
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity>
        <Text style={styles.forgot}>忘记密码?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>登录</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.signUpText}>注册</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Login;
