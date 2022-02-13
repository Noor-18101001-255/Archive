import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  Dimensions,
  TextInput,
  FlatList,

} from 'react-native';
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons';
// Fonts
import { useFonts } from 'expo-font';
import User from '../Models/User';
import Constants from '../Models/Constants';
import Header from '../Components/Header';
import Dialog from '../Components/Dialog';
import GlobalMethods from '../Models/GlobalMethods';
import ListItem from '../Components/ListItem';

function Photos({ photos }) {

  const imgWidth = Dimensions.get('screen').width * 0.33333;
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}>
        {photos.map((photo, index) => (
          <View key={index}>
            <Image
              style={{ width: imgWidth, height: imgWidth }}
              source={{
                uri: `https://picsum.photos/200/300?random=${index + 1}`,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

function Albums(prop) {
  const [albums, setAlbum] = useState(prop.data);

  const imgWidth = Dimensions.get('screen').width * 0.33333;
  // alert(imgWidth);
  return (

    <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
      {albums.map((album, albumIndex) => (
        <ScrollView key={albumIndex} horizontal showsHorizontalScrollIndicator={false}>
          {album.images.map((img, imgIndex) => (
            <TouchableWithoutFeedback key={imgIndex} style={{ flexDirection: 'row', marginTop: 10 }}
              onPress={prop.ProductHanler}
            >
              <Image
                style={{ width: imgWidth + 50, height: imgWidth + 50 }}
                source={{ uri: img.image }}
              />
              {/* {console.log(imgWidth)} */}
            </TouchableWithoutFeedback>
          ))}


          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              backgroundColor: '#111',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 6,
            }}>
            <Text style={{ color: '#fff', fontFamily: 'SourceSansPro-Bold', fontSize: 20 }}>
              {album.name}
            </Text>
          </View>
        </ScrollView>
      ))}
    </View>
  );
}

function Products(props) {
  return (
    <View>
      <FlatList
        data={props.data}
        keyExtractor={(it, i) => i}
        renderItem={(({ item }) => (
          <ListItem Item={item} />
        ))}
      />
    </View>
  );
}

export default function Profile(props) {

  const [user, setuser] = useState({});
  const [loading, setLoading] = useState(true);
  const [ShowDialog, setShowDialog] = useState(false);
  const [UserBio, setUserBio] = useState('');
  const [userProducts, setUserProducts] = useState([]);
  const [CatProducts, setCatProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);


  useEffect(() => {
    setAllProducts([]);
    // console.log(userProducts);
    _.map(userProducts, (item) => {
      // console.log(item);
      let images = [];
      let name = '';
      _.map(item, (child) => {
        // console.log(child);
        setAllProducts(x => [...x, child]);
        name = child.catagory.name;
        if (child.picture.toString().startsWith('/Product')) {
          // console.log('product');
          images = [...images, { image: 'https://localhost:44330/' + child.picture }];
        }
        else {
          // console.log('Non-product');
          images = [...images, { image: child.picture }];
        }
      });
      let d = { name, images: images };
      // console.log(d)
      setCatProducts(x => [...x, d]);
    });
  }, [userProducts]);


  useEffect(() => {
    console.log(allProducts)
  }, [allProducts]);

  const [loaded] = useFonts({
    SourceSansProLight: require('../assets/fonts/SourceSansPro/SourceSansPro-Light.ttf'),
    SourceSansProRegular: require('../assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf'),
    SourceSansProBold: require('../assets/fonts/SourceSansPro/SourceSansPro-Bold.ttf'),
  });
  const fetching = async () => {
    let data = await GlobalMethods.fetchUseById("18875a4d-91fd-4b6c-a11b-343dd689f084");

    setuser(data);
    // console.log(data);
    setUserBio(data.bio);

    let productdata = await GlobalMethods.GetProductsByCatagory(Constants.userId);

    setUserProducts(productdata);
    // let anObj = []
    // let obj = productdata;

  }

  // React.useEffect(() => {
  //       fetching();

  // } ,[1]);
  const [showContent, setShowContent] = useState('Products');

  const EditUserBio = async () => {
    if (UserBio != null && UserBio != '') {

      console.log(UserBio);

      let data = JSON.stringify({
        username: user.username,
        password: user.password,
        bio: UserBio,

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
      let res = await fetch(Constants.EditUserBio, options);
      let resData = await res.text();
      if (resData != 'Done')
        console.log(resData);
      else
        await fetching();
    }
    else {
      console.log('UserBio is null');
    }
  }


  const GotoProducts = () => {
    props.navigation.navigate('CreateProduct');
  }
  if (loading || !loaded) {
    return (
      <AppLoading
        startAsync={fetching}
        onFinish={() => setLoading(false)}
        onError={console.warn}
      />
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title={user.username} CanGoBack={false} />

      {user &&

        <ScrollView showsVerticalScrollIndicator={false}>

          <>
            <View>
              <Image
                style={styles.coverImage}
                blurRadius={5}
                // source={{ uri: 'https://picsum.photos/500/500?random=211' }}
                source={{ uri: user.picture }}
              />
            </View>
            <View style={styles.profileContainer}>
              {/* Profile Details */}
              <View>
                {/* Profile Image */}
                <View style={styles.profileImageView}>
                  <Image
                    style={styles.profileImage}
                    source={{
                      uri: user.picture,
                    }}
                  />
                </View>
                {/* Profile Name and Bio */}
                <View style={styles.nameAndBioView}>
                  <Text style={styles.userFullName}>{user.firstName + " " + user.lastName}</Text>
                  <View style={{
                    flexDirection: 'row', padding: 10,
                    justifyContent: 'space-between'
                  }}>

                    <Text style={styles.userBio}>

                      {user.bio}</Text>
                    <TouchableOpacity onPress={() => setShowDialog(true)}>
                      <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Posts/Followers/Following View */}
                <View style={styles.countsView}>
                  <View style={styles.countView}>
                    <Text style={styles.countNum}>{allProducts.length}</Text>
                    <Text style={styles.countText}>Products</Text>
                  </View>
                  <View style={styles.countView}>
                    <Text style={styles.countNum}>1246</Text>
                    <Text style={styles.countText}>Followers</Text>
                  </View>
                  <View style={styles.countView}>
                    <Text style={styles.countNum}>348</Text>
                    <Text style={styles.countText}>Following</Text>
                  </View>
                </View>
                {/* Interact Buttons View */}
                <View style={styles.interactButtonsView}>
                  <TouchableOpacity style={styles.interactButton}>
                    <Text style={styles.interactButtonText}>Follow</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => props.navigation.navigate('CreateProduct', { userId: user.id })}
                    style={styles.interactButton}>
                    <Text
                      style={styles.interactButtonText}>
                      Products
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* Mutual Followed By Text */}
                <View style={{ paddingHorizontal: 25, marginTop: 10 }}>
                  <Text style={{ fontFamily: 'SourceSansProRegular', fontSize: 16 }}>
                    {'Followed by '}
                    <Text style={{ fontFamily: 'SourceSansProBold' }}>john_doe </Text>
                    {'and '}
                    <Text style={{ fontFamily: 'SourceSansProBold' }}>19 others</Text>
                  </Text>
                </View>
              </View>
              {/* Profile Content */}
              <View style={{ marginTop: 20 }}>
                <View style={styles.profileContentButtonsView}>
                  <TouchableOpacity
                    style={{
                      ...styles.showContentButton,
                      borderBottomWidth: (showContent === 'Photos') ? 2 : 0,
                    }}
                    onPress={() => setShowContent('Photos')}>
                    <Text style={styles.showContentButtonText}>Photos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...styles.showContentButton,
                      borderBottomWidth: showContent === 'Albums' ? 2 : 0,
                    }}
                    onPress={() => setShowContent('Albums')}>
                    <Text style={styles.showContentButtonText}>Albums</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...styles.showContentButton,
                      borderBottomWidth: showContent === 'Products' ? 2 : 0,
                    }}
                    onPress={() => setShowContent('Products')}>
                    <Text style={styles.showContentButtonText}>Products</Text>
                  </TouchableOpacity>
                </View>
                {showContent === 'Photos' ? (
                  <Photos photos={new Array(13).fill(1)} />
                ) : showContent === 'Albums' ? (
                  <Albums data={CatProducts} ProductHanler={GotoProducts} />
                ) : (
                  <Products data={allProducts} />
                )}
              </View>
            </View>
          </>
        </ScrollView>
      }
      <Dialog visible={ShowDialog} title="Edit Your Bio" onClose={() => setShowDialog(false)} OnSubmit={EditUserBio}>
        <TextInput
          placeholder="Your Bio"
          placeholderTextColor="#808e9b"
          style={styles.input}

          keyboardType="default"
          bind={UserBio}
          value={UserBio}
          onChangeText={(e) => setUserBio(e)}
        />
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImage: { height: 300, width: '100%' },
  profileContainer: {
    // height: 1000,
    backgroundColor: '#fff',
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImageView: { alignItems: 'center', marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameAndBioView: { alignItems: 'center', marginTop: 10 },
  userFullName: { fontFamily: 'SourceSansProBold', fontSize: 26 },
  userBio: {
    fontFamily: 'SourceSansProRegular',
    fontSize: 18,
    color: '#333',
    marginTop: 4,
  },
  countsView: { flexDirection: 'row', marginTop: 20 },
  countView: { flex: 1, alignItems: 'center' },
  countNum: { fontFamily: 'SourceSansProBold', fontSize: 20 },
  countText: { fontFamily: 'SourceSansProRegular', fontSize: 18, color: '#333' },
  interactButtonsView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  interactButton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b7bec',
    margin: 5,
    borderRadius: 4,
  },
  interactButtonText: {
    fontFamily: 'Bold',
    color: '#fff',
    fontSize: 18,
    paddingVertical: 6,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#e9e9e9',
    borderRadius: 6,
    marginTop: 10,
    outlineStyle: 'none',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333333',
  },
  profileContentButtonsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 60,

    // marginBottom:10,
    borderTopWidth: 2,
    borderTopColor: '#f1f3f6',
  },
  showContentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#000',
  },
  showContentButtonText: {
    // fontFamily: 'SourceSansProRegular',
    fontSize: 18,
    fontFamily: 'SourceSansProBold',
  },
});
