import React, {Component} from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

// import Preview from './src/Preview';
// import FlatListSlider from './src/FlatListSlider';
import {FlatListSlider} from 'react-native-flatlist-slider';
import Color from '../Models/Color';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      // data: [
      //   {
      //     image:
      //       'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      //     desc: 'Silent Waters in the mountains in midst of Himilayas',
      //   },
      //   {
      //     image:
      //       'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
      //     desc:
      //       'Red fort in India New Delhi is a magnificient masterpeiece of humans',
      //   },
      //   {
      //     image:
      //       'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      //     desc:
      //       'Sample Description below the image for representation purpose only',
      //   },
      //   {
      //     image:
      //       'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      //     desc:
      //       'Sample Description below the image for representation purpose only',
      //   },
      //   {
      //     image:
      //       'https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
      //     desc:
      //       'Sample Description below the image for representation purpose only',
      //   },
      // ],
    };
  }

  render() {
    // console.log(this.state);
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
      <SafeAreaView>
        <ScrollView>
        {/* <FlatListSlider
            data={this.state.data}
            timer={5000}
            autoscroll={false}
            // onPress={item => alert(JSON.stringify(item))}
            indicatorContainerStyle={{position:'absolute', bottom: 20}}
            indicatorActiveColor={'#e2e2e2'}
            indicatorInActiveColor={'#ffffff'}
            indicatorActiveWidth={30}
            animation
            loop={true}
          /> */}
           <FlatListSlider
            data={this.state.data}
            timer={5000}
            // imageKey={'image'}
            // local={false}
            width={screenWidth}
            // separator={0}
            indicatorActiveWidth={40}
            indicatorActiveColor={Color.primary}
            // loop={true}
            autoscroll={false}
            currentIndexCallback={index => console.log('Index', index)}
            onPress={item => alert(JSON.stringify(item))}
            indicator
            animation
          />
         {/* <View style={styles.separator} />
          <FlatListSlider
            data={this.state.data}
            width={275}
            timer={4000}
            // component={<Preview />}
            onPress={item => alert(JSON.stringify(item))}
            indicatorActiveWidth={40}
            contentContainerStyle={styles.contentStyle}
          /> */}
          {/* <View style={styles.separator} /> */}
         
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
  contentStyle: {
    paddingHorizontal: 16,
  },
});