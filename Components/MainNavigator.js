import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import LoginScreen from '../Screens/LoginScreen'
import SignUpScreen from '../Screens/SignUpScreen'
import Profile from '../Screens/Profile'
import ProductScreen from '../Screens/ProductScreen'
import CreateProduct from '../Screens/CreateProduct'
import Color from '../Models/Color';


const Stack = createStackNavigator();
const options = ({ route }) => {
  try {
    return {
      title: route.params.name,
      headerStyle: {
        backgroundColor: Color.primary,
      },
      headerShown: false,
      headerTintColor: 'white',
    }
  } catch (error) {

    return {
      // title: 'default',
      headerStyle: {
        backgroundColor: Color.primary,
      },
      headerShown: false,
      headerTintColor: 'white',

    }
  }
};


const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>


        <Stack.Screen name="Profile"
          component={Profile}
          options={options} />

        <Stack.Screen name="CreateProduct"
          component={CreateProduct}
          options={options} />

        <Stack.Screen name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }} />

        <Stack.Screen name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }} />



        <Stack.Screen name="ProductScreen"
          component={ProductScreen}
          options={options} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;