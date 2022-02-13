// import 'react-native-gesture-handler';
import  React from 'react';
import { StatusBar } from 'react-native';
import MainNavigator from './Components/MainNavigator';


const MyStack = () => {
  React.useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);
  return (
      <MainNavigator>

      </MainNavigator>
   
  )
}
export default MyStack
