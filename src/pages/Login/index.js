import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity, ImageBackground,
} from 'react-native';
import styles from './styles';

const Login = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <ImageBackground
      source={require('../../assets/img/loginPageBg.png')}
      style={styles.container}
    >
      <Text style={styles.logo}>营造狮</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="手机号..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setUserName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="密码..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>忘记密码?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>登录</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.signUpText}>注册</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Login;
