// import 'react-native-gesture-handler';
import  React from 'react';
import { View,StatusBar } from 'react-native';
import MainNavigator from './Components/MainNavigator';
import Slider from './Components/Slider';


const MyStack = () => {
  React.useEffect(() => {
    // StatusBar.setBarStyle('dark-content', true);
    // StatusBar.setBackgroundColor('red', true);
    // console.log("Status bar length "+StatusBar.currentHeight);
  }, []);
  return (
      <MainNavigator/>
  )
}
export default MyStack
