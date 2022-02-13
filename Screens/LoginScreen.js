import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import Color from '../Models/Color';
import Login from '../Components/Login';
import Constants from '../Models/Constants';

export default function LoginScreen(props) {
  const [Username, SetUserName] = useState('');
  const [Password, SetPassword] = useState('');
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  const loginUser = () => {
    if (Username.length <= 0)
      Alert.alert('Error', 'We Cant Help you without Username/Email');
    else if (Password.length <= 0)
      Alert.alert('Error', 'PLease provid us password');
    else {
      var data = JSON.stringify({
        Username,
        Password
      })
      fetch(Constants.Login, {
        method: 'POST',
        body: data,
        headers: {
          // Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer e3fff09e-576b-4a08-8529-e88efd8eb5d5',
        },
      }).then(x => x.text()).then(x => {
        var validate = require('uuid-validate');
        console.log(x);
        if (validate(x)) {
          Alert.alert('Login Successfully', 'PLease wait');
          console.log('Logined');
          props.navigation.navigate('Profile',{
            UserId: x,
            name: Username,
          });
        }
        else {
          Alert.alert('Login Failed', 'x');
          console.log('Failes');
        }
      })





    }


  };
  return (
    <Login Title="Login" loginUser={loginUser} navigation={props.navigation}>
      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#808e9b"
        style={styles.input}
        autoCorrect={true}
        // autoCapitalize={false}
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        bind={Username}
        onChangeText={(e) => SetUserName(e)}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#808e9b"
        style={styles.input}
        secureTextEntry={true}
        textContentType="password"
        bind={Password}
        onChangeText={(e) => SetPassword(e)}
      />
    </Login>
  );
}

const styles = StyleSheet.create({

  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#808e9b',
  },

});
