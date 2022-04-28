import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { NativeBaseProvider } from 'native-base'
import StackNavigator from './src/Navigator/StackNavigator'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    }
  }

  async loadFonts() {
    await Font.loadAsync({          
         MontserratRegular: require('./assets/fonts/MontserratRegular.ttf'),        
         MontserratSemiBold: require('./assets/fonts/MontserratSemiBold.ttf'), 
         MontserratBold: require('./assets/fonts/MontserratBold.ttf'), 
         FontAwesome: require('./assets/fonts/FontAwesome.ttf'), 
         Feather: require('E:/React Native/CoffeeShop/assets/fonts/Feather.ttf'), 
         SourceSansProRegular: require('./assets/fonts/SourceSansProRegular.ttf'),
         SourceSansProLight: require('./assets/fonts/SourceSansProLight.ttf'),
         SourceSansProBold: require('./assets/fonts/SourceSansProBold.ttf'),         
    });
    this.setState({fontsLoaded: true})
  }

  componentDidMount() {
    this.loadFonts();
  }
 render() {
  if(this.state.fontsLoaded){
    return (
    //  <NativeBaseProvider>
       <StackNavigator />
    //  </NativeBaseProvider>
    );
  }
  else {
    return (
      null
    )
  }
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
