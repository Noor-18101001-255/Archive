import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Color from "../Models/Color";
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';

const RenderHeader = (props) => {
  return (
    <View style={Styles.headerContainer}>
      <View style={[Styles.childContainer, { alignItems: 'flex-start' }]}>
        {props.CanGoBack &&
          <TouchableOpacity onPress={() => console.log("back")}>
            <AntDesign name="back" size={24} color="black" />
          </TouchableOpacity>
        }
      </View>

      <View style={Styles.childContainer}>
        <Text style={Styles.headerText}>
          {props.title}
        </Text>
      </View>

      <View style={[Styles.childContainer, { alignItems: 'flex-end' }]}>
        {!props.CanGoBack &&
        
        <TouchableOpacity style={{ flexDirection: 'row-reverse', padding: '2%', }} onPress={() => console.log("back")}>
          {/* <Text style={Styles.logoutText}>Logout</Text> */}
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
        }
      </View>
    </View>
  );
}
const Header = (props) => {
  const [loaded] = useFonts({
    SourceSansProLight: require('../assets/fonts/SourceSansPro/SourceSansPro-Light.ttf'),
    SourceSansProRegular: require('../assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf'),
    SourceSansProBold: require('../assets/fonts/SourceSansPro/SourceSansPro-Bold.ttf'),
  });



  return (
    <RenderHeader title={props.title} CanGoBack={props.CanGoBack} />
  );
}

const Styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: "#ffffff",
    padding: 15,
// borderBottomEndRadius:'10',
// borderBottomStartRadius:'10',
shadowColor:'black',
shadowOffset:{width:0,height:4},
shadowOpacity:0.3,
shadowRadius:15,
elevation:15,

  }, childContainer: {
    flex: 1,
    // alignItems:'center',

  },
  headerText: {
    fontSize: 20,
    fontFamily: 'SourceSansProBold',
    textAlign: 'center',

  },
  logoutText: {
    fontSize: 15,
    fontFamily: 'SourceSansProBold',

  },
});

export default Header;