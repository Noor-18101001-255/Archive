import React from 'react';
import { View, Text, TouchableOpacity,TouchableNativeFeedback,Platform, StyleSheet, Image, TouchableOpacityBase } from 'react-native';

const ListItem = (props) => {
  // console.log(props.Item.picture)
  let TouchableComponent = TouchableOpacity;
  if(Platform.OS =='android'){
    TouchableComponent = TouchableNativeFeedback;
  }
  return (
    <TouchableComponent
    onPress={props.ClickHandler.bind(this,props.Item.id)}
    >
    <View style={styles.Container}>
      <Image
        style={styles.image}
        
        source={{
          uri: 
          // props.Item.picture
          (props.Item.picture.toString().startsWith('/Product'))
          // ?('https://localhost:44330/'+props.Item.picture)
          ?('http://fbdm.somee.com/'+props.Item.picture)
          :(props.Item.picture)
        }} />
      <View style={{flex:5,flexDirection:'column'}}>
      <View style={styles.Container2}>
        <Text style={styles.text}>{props.Item.name}</Text>
      </View>
      <View style={styles.Container3}>
        <Text  style={styles.text,{fontSize:14}}>
        {(props.Item.quantity>0)
        ?props.Item.quantity+" items Left"
        :"Out of stock"
        }
        </Text>
        <Text  style={styles.text,{fontSize:14}}>{props.Item.price} Rs/-</Text>
      </View>
      </View>
    </View>
    </TouchableComponent>
  );
}

const styles = StyleSheet.create({
  Container: {
    // flex: 1,
    flexDirection: 'row',
    // width:'90%',
    height: 90,
    // padding:10,
    marginVertical: 10,
    marginHorizontal: 18,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
  }, image: {
    // flex: 1,
    width: 90,
    height: 90,
    // alignSelf: 'center',
    marginRight: 7,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  Container2: {
    flex: 4,
    alignItems:'flex-start'
  },
  Container3: {
    flex: 2,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:6,
  },
  text:{
    fontSize: 17,
    fontWeight:'bold',
    fontFamily: "Roboto-Regular"
  },  

});
export default ListItem;