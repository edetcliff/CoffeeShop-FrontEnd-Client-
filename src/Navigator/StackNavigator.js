import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SubMenuScreen from '../Screens/SubMenuScreen';
import BottomNavigator from './BottomNavigator';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default class StackNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }


 render() {
  return(
    <NavigationContainer>
        <Stack.Navigator >
        <Stack.Screen name = 'BottomNavigator' component={BottomNavigator} 
          options={({ navigation }) => ({       
            headerShown: false,                                                                                   
        })}
        />
        <Stack.Screen name = 'SubMenu' component={SubMenuScreen}
            options={({ navigation }) => ({       
                headerShown: true, 
                title: 'Sub Menu', 
                headerStyle: {
                  //backgroundColor: '#D0BB94',
                  backgroundColor: '#BD620F'
                  
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },                                                                        
            })}  
        />
    </Stack.Navigator>
    </NavigationContainer>
  )
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
