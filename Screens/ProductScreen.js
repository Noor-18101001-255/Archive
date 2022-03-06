import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import Constants from 'expo-constants';
import { AntDesign as Ant, Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons';

import { useFonts } from 'expo-font';
import MontserratRegular from '../assets/fonts/Montserrat/Montserrat-Regular.ttf';
import MontserratBold from '../assets/fonts/Montserrat/Montserrat-Bold.ttf';
import MontserratExtraBold from '../assets/fonts/Montserrat/Montserrat-ExtraBold.ttf';
import Slider from '../Components/Slider';
import Header from '../Components/Header';
import GlobalMethods from '../Models/GlobalMethods';
import AppLoading from 'expo-app-loading';


const Rating = ({ rating, maxRating }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array(rating)
        .fill(1)
        .map((el, ind) => (
          <FAIcon name='star' key={ind} size={20} color='#2e2e2e' />
        ))}
      {Array(maxRating - rating)
        .fill(1)
        .map((el, ind) => (
          <FAIcon name='star-o' key={ind} ind size={20} color='#2e2e2e' />
        ))}
    </View>
  );
};

export default function ProductScreen(props) {
  const [loaded] = useFonts({
    MontserratRegular,
    MontserratBold,
    MontserratExtraBold,
  });

  const [isFavourite, setFavourite] = useState(false);
  const [size] = useState([
    { id: 1, label: 'S' },
    { id: 2, label: 'M' },
    { id: 3, label: 'L' },
    { id: 4, label: 'XL' },
  ]);

  const [selectedSize, setSelectedSize] = useState('M');

  const [productDescription] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ornare urna. Duis egestas ligula quam, ut tincidunt ipsum blandit at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae justo congue, tempor urna vitae, placerat elit. Nulla nec consectetur dolor, in convallis erat. Fusce hendrerit id sem tristique congue. \n\nVestibulum mauris sapien, vulputate in lacus in, lacinia efficitur magna. Sed id massa ut magna eleifend lacinia et id tellus. Sed dignissim mollis lacus. Etiam laoreet ex eu sem euismod congue. In maximus porttitor imperdiet. Nulla eu dolor vehicula ligula mollis tristique ut in enim. Phasellus quis tempor velit. Vivamus sit amet orci ornare, pulvinar purus et, commodo magna. Nunc eu tortor vitae leo varius vehicula quis volutpat dolor.\n\nDonec interdum rutrum tellus, et rhoncus risus dignissim at. Aliquam sed imperdiet tortor, non aliquam sapien. Cras quis enim a elit fringilla vehicula. Aenean pulvinar ipsum a magna feugiat, a fermentum ante pellentesque. Mauris tincidunt placerat placerat. Quisque tincidunt enim sed metus fermentum maximus. Fusce eu tempus est.`
  );

  const [seeFullDescription, setSeeFullDescription] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [product, setProduct] = useState([]);
  const [productImages, setProductImages] = useState([]);

  const [ReqProducts, setRecProduct] = useState([]);
  const [moreProducts, setMoreProduct] = useState([]);

  // productName: 'Black Printed Tshirt',
  // productPrice: 19.49,
  // productImage:
  //   'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff');
  }, []);
  useEffect(() => {
    if (typeof (product.picture) !== 'undefined') {
      let a = '';
      a = product.picture;
      let c = a.split('=|=');
      console.log(c);
      console.log(typeof (c));
      if (c.length > 1)
        c = c.filter(x => x);

      console.log(c);
      let b = [];
      c.map(val => {
        b = [...b, {
          image: val,
        }]
        return b;
      });
      setProductImages(b);

    }
  }, [product]);

  useEffect(() => {
    let data = ReqProducts;
    let d =[];
    Object.values(data).map(item => {
      let pictures = '';
      pictures = item.picture;
      let a  = pictures.split("=|=");
      d =[...d,
        {
          productName: item.name,
          productPrice: item.price,
          productImage: a[0],
        }];
      });
       
    
    setMoreProduct(d);

  }, [ReqProducts]);

  useEffect(() => {
console.log(moreProducts)
  },[moreProducts]);



  const fetching = async () => {
    console.log(props.route.params)
    let data = await GlobalMethods.fetchProductById(props.route.params.productId);
    console.log(data);
    setProduct(data);

    let MoreProductdata = await GlobalMethods.GetRecommendedProducts(data.createrId, data.id);
    console.log(MoreProductdata);
    setRecProduct(MoreProductdata);


  }

  const navigateBack = () => {
    console.log("Back");
    props.navigation.goBack();
  }



  if (!assetsLoaded || !loaded) {
    return (
      <AppLoading
        startAsync={fetching}
        onFinish={() => { setAssetsLoaded(true); }}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <View style={styles.header}>
      <TouchableOpacity onPress={()=>props.navigation.goBack()}>
        <Ant name='back' size={30} />
      </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.name}</Text>
        <Icon name='' size={26} />
      </View> */}
      <Header title={product.catagory.name} GoBack={navigateBack.bind(this)} CanGoBack={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View>
          <Image
            style={{ height: 500, resizeMode: 'cover' }}
            source={{
              uri:
                'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            }}
          />
        </View> */}
        <Slider data={productImages} />
        <View style={styles.detailsView}>
          <View style={styles.productTitleView}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <TouchableOpacity onPress={() => setFavourite(!isFavourite)}>
              <FAIcon name={isFavourite ? 'heart' : 'heart-o'} size={22} />
            </TouchableOpacity>
          </View>
          <View style={styles.productPriceView}>
            <Text style={styles.discountedPriceText}>${Math.round(product.price)}</Text>
            <Text style={styles.actualPriceText}>${Math.round(product.price + (product.price * 0.3))}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Rating
              // rating={Math.floor(Math.random() * 5) + 2} 
              rating={4}
              maxRating={5} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'MontserratBold',
                marginBottom: 10,
              }}
            >
              Size:
            </Text>
            <View style={{ flexDirection: 'row' }}>
              {size.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={
                    selectedSize === s.label ? styles.tagSelected : styles.tag
                  }
                  onPress={() => setSelectedSize(s.label)}
                >
                  <Text
                    style={
                      selectedSize === s.label
                        ? styles.tagLabelSelected
                        : styles.tagLabel
                    }
                  >
                    {s.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={[styles.buttonText, { color: '#111' }]}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
          <TouchableOpacity
            style={styles.productDescriptionHeader}
            onPress={() => setSeeFullDescription((prev) => !prev)}
          >
            <Text style={{ fontFamily: 'MontserratBold', fontSize: 18 }}>
              Product Description
            </Text>
            <TouchableOpacity
              onPress={() => setSeeFullDescription((prev) => !prev)}
            >
              {seeFullDescription ? (
                <Icon name='chevron-up' size={26} />
              ) : (
                <Icon name='chevron-down' size={26} />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={{ padding: 10 }}>
            <Text style={{ fontFamily: 'MontserratRegular' }}>
              {seeFullDescription
                ? `${productDescription}`
                : `${productDescription.split('\n')[0]}`}
            </Text>
          </View>
        </View>
        {moreProducts.length>0&&<View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontFamily: 'MontserratBold',
              fontSize: 20,
              marginHorizontal: 10,
            }}
          >
            More Products
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10 }}>
              { Object.values(moreProducts).map((item, ind) => (
                <View key={ind} style={{ width: 180, marginHorizontal: 10 }}>
                  <View style={styles.moreProductImageView}>
                    <Image
                      style={{ flex: 1 }}
                      source={{
                        uri: item.productImage,
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.moreProductName}>
                      {item.productName}
                    </Text>
                    <View style={styles.moreProductPriceView}>
                      <Text style={styles.moreProductPrice}>
                        ${item.productPrice}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon
                          style={styles.moreProductIcon}
                          name='heart'
                          size={18}
                        />
                        <Icon
                          style={styles.moreProductIcon}
                          name='shopping-bag'
                          size={18}
                        />
                        <Icon
                          style={styles.moreProductIcon}
                          name='share'
                          size={18}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.moreProductBuyButton}>
                    <Text style={styles.moreProductBuyButtonText}>Buy</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>}
        <View style={{ height: 60 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    borderBottomColor: '#dfe4fe',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'MontserratBold',
  },
  detailsView: {
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  productTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 24,
    fontFamily: 'MontserratExtraBold',
  },
  productPriceView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPriceText: { fontFamily: 'MontserratBold', fontSize: 20 },
  actualPriceText: {
    color: '#222',
    marginLeft: 10,
    textDecorationLine: 'line-through',
    fontSize: 18,
    fontFamily: 'MontserratRegular',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#111',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  addToCartButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#111',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'MontserratBold',
  },
  tag: {
    borderRadius: 4,
    backgroundColor: '#FFF',
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabel: {
    fontFamily: 'MontserratBold',
    color: '#333',
  },
  tagSelected: {
    backgroundColor: '#333',
    borderRadius: 4,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabelSelected: {
    fontFamily: 'MontserratBold',
    color: '#FFF',
  },
  productDescriptionHeader: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dfe4fe',
  },
  moreProductImageView: {
    flex: 1,
    height: 240,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  moreProductName: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
  },
  moreProductPriceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  moreProductPrice: {
    fontSize: 16,
    fontFamily: 'MontserratRegular',
  },
  moreProductIcon: {
    marginLeft: 10,
  },
  moreProductBuyButton: {
    backgroundColor: '#111',
    marginTop: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreProductBuyButtonText: {
    color: '#fff',
    fontFamily: 'MontserratBold',
    fontSize: 18,
  },
});