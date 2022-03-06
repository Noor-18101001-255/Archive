import React from 'react';
import { View, Image, Text, TextInput, ImageBackground, Alert, StatusBar, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import uuid from 'react-native-uuid';
import SelectDropdown from 'react-native-select-dropdown'
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import Login from '../Components/Login';
import product from '../Models/product';
import Constants from '../Models/Constants';
import Dropdown from '../Components/Dropdown';
import GlobalMethods from '../Models/GlobalMethods';




const SignUpScreen = (props) => {

  const [Product, SetProduct] = React.useState([]);
  const [Images, SetImages] = React.useState([]);
  const [Catagories, setCatagories] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const countries = ["Egypt", "Canada", "Australia", "Ireland"]
  const handleProduct = (name, value) => {
    const Catagories = [];
    // console.log(name+": "+value);
    SetProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const ValueChecker = (val) => val.length > 0
  // const CreateProduct = () => {
  //   console.log(Product);
  //   console.log(Images);
  // }
  const CreateProduct = () => {
    let product = Product;
    product.createrId = props.route.params['userId'];
     
    if (Images === null) {
      Alert.alert("Please Choose images ");
      alert("Please Choose images ");

    }
    else if (ValueChecker(product.Name) && ValueChecker(product.Price) &&
      ValueChecker(product.catagoryId) && ValueChecker(product.Quantity)
    ) {


      let data = JSON.stringify({
        id: uuid.v4(),
        name: product.Name,
        price: product.Price,
        quantity: product.Quantity,
        catagoryId: product.catagoryId,
        createrId: product.createrId,
        picture: 'picture',
        images:  Images,
        
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

      fetch(Constants.addProduct, options).then(x => x.text())
        .then(x => {
          if (x == "Done") {
            Alert.alert('Created', 'Product Created');
            // alert('Logined');
            props.navigation.navigate('Profile');
          }
          else {
            Alert.alert('Failed', 'Product Creation Failed');
            // alert('Failed');
          }
        }).catch((error) => {
          console.log(error);
          // throw error;
        });
    }
    else {
      Alert.alert("Please fill all fields");
      // console.log("Please fill all fields");
    }


  };


  if (!loaded) {
    return (
      <AppLoading
        startAsync={async () => {
          let data = await GlobalMethods.GetAllCats();
          console.log(data);
          setCatagories(data);
        }}
        onFinish={() => setLoaded(true)}
        onError={console.warn}
      />
    );
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
        if (!Images.includes(result.uri)) {

          SetImages(x => [...x,{uri: result.uri,title:'.jpg'}]);
        }
        else {
          alert("Cant Take Same images twice");
        }
      }
    }

    else {
      console.warn("Give Camera Access to use this feature");
      ImagePicker.requestMediaLibraryPermissionsAsync(true);
    }
  };

  return (
    <Login Title="Create Product" loginUser={CreateProduct} Images={Images} navigation={props.navigation} ChooseImage={async () => pickImage()} >
      <TextInput
        placeholder="Name"
        placeholderTextColor="#808e9b"
        style={styles.input}
        autoCorrect={true}
        // autoCapitalize={false}
        // autoCompleteType="name"
        keyboardType="default"
        textContentType="name"
        bind={Product.Name}
        Value={Product.Name}
        onChangeText={(e) => handleProduct('Name', e)}
      />
      <TextInput
        placeholder="Quantity"
        placeholderTextColor="#808e9b"
        style={styles.input}
        autoCorrect={true}
        // autoCapitalize={false}
        // autoCompleteType="number"
        keyboardType="number-pad"
        bind={Product.Quantity}
        value={Product.Quantity}
        onChangeText={(e) => handleProduct('Quantity', e.replace(/[^0-9]/g, ''))}
      />
      <TextInput
        placeholder="Price"
        placeholderTextColor="#808e9b"
        style={styles.input}
        autoCorrect={true}
        // autoCapitalize={false}
        // autoCompleteType="number"
        keyboardType="number-pad"
        bind={Product.Price}
        value={Product.Price}
        onChangeText={(e) => handleProduct('Price', e.replace(/[^0-9]/g, ''))}
      />
      <Dropdown data={Catagories} onValueChange={e => handleProduct('catagoryId', e)} style={styles.input} label={'Select Catagory'} />

      {(Images.length < 6) &&
        <TouchableOpacity
          style={styles.input}
          // disabled={(Images.length>=3)}
          onPress={pickImage.bind(this)}>
          <Text style={[styles.fpText, { alignSelf: 'center', }]}>
            Choose Image
          </Text>
        </TouchableOpacity>

      }

      {Images.length > 0 &&

        <View style={styles.imageContainer}>
          <FlatList numColumns={3} keyExtractor={(item, index) => index} data={Images} renderItem={({ item, index }) => (
            <View style={{ flex: 1, }}>
              <ImageBackground style={styles.Image}
                source={{ uri: item.uri }}>
                <TouchableOpacity 
                onPress={() => SetImages(x=>x.filter(x=>x.uri !=item.uri))}>
                  <AntDesign name="closecircle" size={30} color="red" />
                </TouchableOpacity>
              </ImageBackground>
              <Image

              />
              {console.log(item)}
            </View>
          )} />
        </View>
      }
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
  fpText: {

    color: '#B33771',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 10,
  },
  imageContainer: {
    width: '100%',
    // height: 50,

    backgroundColor: '#333',
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    // fontSize: 16,
    // color: '#808e9b',
  },
  Image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
    // borderWidth: 2,
    // borderColor: '#fff',
  },
});

export default SignUpScreen;