import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TouchableOpacityBase } from 'react-native';

const ListItem = (props) => {
  console.log(props.Item.picture)
  return (
    <TouchableOpacity
    onPress={()=>console.log(props.Item.name+" Selected")}
    >
    <View style={styles.Container}>
      <Image
        style={styles.image}
        source={{
          uri: 
          // props.Item.picture
          (props.Item.picture.toString().startsWith('/Product'))
          ?('https://localhost:44330/'+props.Item.picture)
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Container: {
    felx: 1,
    flexDirection: 'row',
    // width:'90%',
    height: 90,
    marginVertical: 10,
    marginHorizontal: 18,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 15,
  }, image: {
    flex: 1,
    width: 70,
    height: 90,
    alignSelf: 'center',
    marginRight: 10,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
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