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
  Image,
  Touchable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import Color from '../Models/Color'
import GlobalStyles from '../Models/GlobalStyles';
// import Color from '../assets/dummyAvatar.jpg'


const Login = (props) => {

  const SignOrLogIn = props.Title === "Login" || props.Title === "SignUp" ? true :false;
  let existingUser = false;
  let ImageUri = '';
  if(SignOrLogIn){
    existingUser = props.Title !== "Login" ?  true :false;
    if (existingUser) {
      if (props.ProfilePic === null)
        ImageUri = require('../assets/dummyAvatar.jpg');
      else
        ImageUri = props.ProfilePic;
  
    }

  }

  return (
    <TouchableWithoutFeedback style={GlobalStyles.statusbarMargin}
      onPress={() => {
        // Keyboard.dismiss();
      }}>
      <LinearGradient
        //colors={['#222', '#222', '#111']}
        colors={['#222', '#222', '#111']}
        style={styles.container}>
        {(!existingUser && !SignOrLogIn) &&
          <View style={styles.loginTextContainer}>

            <Text style={styles.welcomeText}>{props.Title}!</Text>
            <Text style={styles.loginText}> </Text>
          </View>
        }
        {(!existingUser && SignOrLogIn) &&
          <View style={styles.loginTextContainer}>

            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.loginText}>Login</Text>
          </View>
        }

        {(existingUser && SignOrLogIn) &&
          <View style={styles.loginTextContainer}>

            <Text style={styles.welcomeText}>Welcome!</Text>
            <View style={styles.ProfileView}>
              <Text style={styles.loginText}>Sign Up</Text>
              <TouchableOpacity
              onPress={props.ChooseImage}
              >

                <View>
                  <View style={styles.profileImageView}>
                    <Image
                      style={styles.profileImage}
                      source={{
                        uri: ImageUri,
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        }


        {props.children}


        {(!existingUser && SignOrLogIn) &&
          <TouchableOpacity
            onPress={() => {
              console.log('Coming Soon!');
              Alert.alert('Coming Soon!', 'The Option Is not available yet');
            }}>
            <Text style={[styles.fpText, { alignSelf: 'flex-end', }]}>Forgot Password?</Text>
          </TouchableOpacity>
        }

        {(existingUser && SignOrLogIn) &&
          <TouchableOpacity
            onPress={props.ChooseImage}>
            <Text style={[styles.fpText, { alignSelf: 'flex-start',marginVertical:10,fontWeight:'bold' }]}>Choose profile image</Text>
          </TouchableOpacity>
        }
         <TouchableOpacity style={styles.loginButton} onPress={props.loginUser.bind(this)}>
            <Text style={styles.loginButtonText}>{props.Title}</Text>
          </TouchableOpacity>

         

        {/* <View style={styles.loginWithBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            console.log('Coming Soon!');
            Alert.alert('Coming Soon!', 'The Option Is not available yet');
          }}>
          <Icon name="google" type="font-awesome" size={30} color="#808e9b" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            console.log('Coming Soon!');
            Alert.alert('Coming Soon!', 'The Option Is not available yet');
          }}>
          <Icon
            name="facebook-square"
            type="font-awesome"
            size={30}
            color="#808e9b"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            Alert.alert('Coming Soon!', 'The Option Is not available yet');
          }}>
          <Icon name="apple" type="font-awesome" size={30} color="#808e9b" />
        </TouchableOpacity>
      </View> */}

        {(!existingUser && SignOrLogIn) &&

          <View style={styles.signUpTextView}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                // Alert.alert('Coming Soon!', 'The Option Is not available yet');
                props.navigation.navigate('SignUpScreen');
              }}>
              <Text style={[styles.signUpText, { color: '#B53471' }]}>
                {' Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>
        }
        {(existingUser && SignOrLogIn) &&

          <View style={styles.signUpTextView}>
            <Text style={styles.signUpText}>Already have a account?</Text>
            <TouchableOpacity
              onPress={() => {
                // Alert.alert('Coming Soon!', 'The Option Is not available yet');
                props.navigation.navigate('LoginScreen');
              }}>
              <Text style={[styles.signUpText, { color: '#B53471' }]}>
                {'Login'}
              </Text>
            </TouchableOpacity>
          </View>
        }
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fff',
    alignSelf: 'center',
  },

  loginText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  fpText: {

    color: '#B33771',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#833471',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fafafa',
    alignSelf: 'center',
  },
  // loginWithBar: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   marginTop: 50,
  // },
  // iconButton: {
  //   backgroundColor: '#333',
  //   padding: 14,
  //   marginHorizontal: 10,
  //   borderRadius: 100,
  // },
  signUpTextView: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#808e9b',
    fontSize: 20,
    fontWeight: '500',
  },
  profileImageView: { alignItems: 'center', marginTop: 0 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  ProfileView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});

export default Login;