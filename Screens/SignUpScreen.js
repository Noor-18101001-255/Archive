import React from 'react';
import { View, Text, TextInput, Alert, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';

import * as ImagePicker from 'expo-image-picker';
import Login from '../Components/Login';
import User from '../Models/User';
import Constants from '../Models/Constants';

const SignUpScreen = (props) => {

  const [NewUser, SetNewUser] = React.useState(new User('', '', '', '', '', ''));
  const [profilePic, SetProfilePic] = React.useState(null);
  const [profileTitle, SetProfileTitle] = React.useState('');
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const handleNewUser = (name, value) => {

    // console.log(name+": "+value);
    SetNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
    // StatusBar.setBackgroundColor('red', true);
    // console.log("Status bar length "+StatusBar.currentHeight);
  }, []);
  const ValueChecker = (val) => val.length >0

  const SignUpUser = () => {
    let user = NewUser;
    user.id = uuid.v4();
    user.picture = 'uuid.v4()';
    if( profileTitle==null  || profilePic==null){

      Alert.alert("Please Choose Profile Photo");
      console.log("Please Choose Profile Photo");
      
    }
    else if (ValueChecker(user.firstName) && ValueChecker(user.lastName) &&
      ValueChecker(user.username) && ValueChecker(user.password)   
         ) {


      let data = JSON.stringify({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: user.password,
        picture: user.picture,
        image: {
          title: profileTitle,
          uri: profilePic,
        }
      });
      let options = {
        method: 'POST',
        body: data,
        headers: {
          // Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer e3fff09e-576b-4a08-8529-e88efd8eb5d5',
        },
      };

      fetch(Constants.SignUp, options).then(x => x.text())
        .then(x =>{
          var validate = require('uuid-validate');
          if (validate(x)) {
            Alert.alert('Login Successfully', 'PLease wait');
            console.log('Logined');
            props.navigation.navigate('Profile',{
              UserId: x,
              name: NewUser.username,
            });
          }
          else{
            Alert.alert('Login Failed', 'x');
            console.log('Failes');
          }
        }).catch((error) => {
          console.log(error);
          // throw error;
        });
    }
     else {
      Alert.alert("Please fill all fields");
      console.log("Please fill all fields");
    }


  };

  const UsernameCheck = () => {

    var data = new String(NewUser.username);

    console.log(data);
    let option = {
      method: 'POST',

      body: `\"${NewUser.username}\"`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer e3fff09e-576b-4a08-8529-e88efd8eb5d5'
      }
    };
    fetch(Constants.UsernameAvailability, option).then(x => x.json()).then(
      (data) => {
        if (!data) {
          Alert.alert("username Already exist");
          console.log("username Already exist");
          SetNewUser(prevState => ({
            ...prevState,
            'username': ''
          }));
        }
      }
    )
  }

  const pickImage = async () => {
    if (status) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
        aspect: [2, 2],
        quality: 1,
      });

      if (!result.cancelled) {
        // SetProfileTitle(result.title);
        SetProfileTitle('wp5299018.jpg');
        SetProfilePic(result.uri);
      }


    }

    else {
      console.warn("Give Camera Access to use this feature");
      ImagePicker.requestMediaLibraryPermissionsAsync(true);
    }
  };

  return (
    <Login Title="SignUp" loginUser={SignUpUser} ProfilePic={profilePic} navigation={props.navigation} ChooseImage={async () => pickImage()} >
      <TextInput
        placeholder="First Name"
        placeholderTextColor="#808e9b"
        style={styles.input}
        autoCorrect={true}
        // autoCapitalize={false}
        autoCompleteType="name"
        keyboardType="default"
        textContentType="name"
        bind={NewUser.firstName}
        onChangeText={(e) => handleNewUser('firstName', e)}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="#808e9b"
        style={styles.input}
        autoCorrect={true}
        // autoCapitalize={false}
        autoCompleteType="name"
        keyboardType="default"
        textContentType="name"
        bind={NewUser.lastName}

        onChangeText={(e) => handleNewUser('lastName', e)}
      />
      <TextInput
        placeholder="Username"
        placeholderTextColor="#808e9b"
        style={styles.input}
        autoCorrect={true}
        // autoCapitalize={false}
        autoCompleteType="name"
        keyboardType="default"
        textContentType="name"
        bind={NewUser.username}
        value={NewUser.username}
        onBlur={UsernameCheck.bind(this)}
        onChangeText={(e) => handleNewUser('username', e)}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#808e9b"
        style={styles.input}
        secureTextEntry={true}
        textContentType="password"
        bind={NewUser.password}
        onChangeText={(e) => handleNewUser('password', e,)}
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

export default SignUpScreen;