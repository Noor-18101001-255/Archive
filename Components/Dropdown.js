// import React, { FC, useState,useCallback } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
// import { Icon } from 'react-native-elements';


// const Dropdown = (props) => {
//   const [visible, setVisible] = useState(false);
//   const [selItem, setItem] = useState(props.label);



//   const toggleDropdown = () => {
//     setVisible(!visible);
//   };
//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => {console.log(item)}}
//       style={styles.dropdown}
//     >
//       <Text style={styles.dropdownText}>
//         {item}
//       </Text>
//     </TouchableOpacity>

//   );
//   const renderDropdown = () => {
//     if (visible) {
//       return (
//         <FlatList
//           data={props.data}
//           keyExtractor={(item, index) => index}
//           renderItem={renderItem}
//         />

//       );
//     }
//   };

//   return (
//     <TouchableOpacity
//       style={[props.style, styles.button]}
//       onPress={toggleDropdown}
//     >
//       {renderDropdown()}
//       <Text style={styles.buttonText}>{selItem}</Text>
//       <Icon type='font-awesome' name='chevron-down' />
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     width: '100%',
//     height: 50,
//     flexDirection: 'row',
//     alignItems: 'center',
//     // backgroundColor: '#efefef',
//     height: 50,
//     width: '90%',
//     paddingHorizontal: 10,
//     zIndex: 1,
//     alignSelf: 'center',

//   },
//   buttonText: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#808e9b',

//   },
//   dropdown: {
//     // flex:1,

//     height: 50,
//     top: 50,
//     backgroundColor: '#333',
//     zIndex: 2,
//     borderWidth:1,
//     borderColor:'#fff',
//     // width: '60%',
//     // marginVertical: '20%',
//     // paddingHorizontal: 10


//   },
//   dropdownText: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#808e9b',
//   },

// });

// export default Dropdown;

// ===========================================================================



import React, { useState } from "react";
import { Picker, View, Text, StyleSheet } from "react-native";

export default function Dropdown(props) {

  const [selectedcat, setSelectedcat] = useState(props.label);
  const [category, setcategory] = useState([{
     id:'',
     name:props.label
   },...props.data]);



  const onValueChangeCat =(value) => {
    setcategory(val => val.filter(x=>x.id != ''));
    if(value ===''){
      console.log("null");
    }
    else{
      props.onValueChange(value)
    }
  }

  return (
    <View style={[props.style, styles.viewStyle]}>
      <View style={{ flex: 1, fontSize: 14, }}>
        <Picker
          itemStyle={styles.itemStyle}
          mode="dropdown"
          style={styles.pickerStyle}
          // selectedValue={selectedcat}
          onValueChange={onValueChangeCat.bind(this)}
        >
          
          {category.map((item, index) => (
            <Picker.Item key={index + 1}
              color="#808e9b"

              label={item.name}
              value={item.id}
              index={index + 1}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    // flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    width: "92%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemStyle: {
    flex: 1,
    fontSize: 10,
    fontFamily: "Roboto-Regular",
    color: "#808e9b",
    backgroundColor: '#333'
  },
  pickerStyle: {
    width: "100%",
    height: 40,
    color: "#808e9b",
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#333',
    fontFamily: "Roboto-Regular"
  },
  textStyle: {
    fontSize: 14,
    fontFamily: "Roboto-Regular"
  }
});