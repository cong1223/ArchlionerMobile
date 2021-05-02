import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import styles from './styles';
import UserService from '../../services/UserService';
import { Input } from 'react-native-elements';
import { WToast } from 'react-native-smart-tip';

const Login = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = props => {
    UserService.login(userName, password)
      .then(res => {
        console.log('======', res);
      })
      .catch(e => {
        WToast.show({ data: e.message, position: WToast.position.CENTER });
      });
  };

  return (
    <ImageBackground
      source={require('../../assets/img/loginPageBg.png')}
      style={styles.container}
    >
      <Text style={styles.logo}>营造狮</Text>
      <Input
        containerStyle={styles.inputView}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        placeholder="手机号"
        onChangeText={text => setUserName(text)}
      />
      <Input
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
