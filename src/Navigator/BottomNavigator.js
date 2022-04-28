import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MenuScreen from '../Screens/MenuScreen';
import ReservationScreen from '../Screens/ReservationScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default class BottomNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

 render() {
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
                       
      headerStyle: {       
        backgroundColor: '#BD620F'
        
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',        
      },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          //size = 25

          if (route.name === 'Menu') {
              iconName = focused ? 'menu': 'menu-outline';
          } else if (route.name === 'Reservation') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
          }

          //You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        
          "tabBarActiveTintColor": "#611F0F",
          "tabBarInactiveTintColor": "gray",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]
        
       
    })}    
    
    >
        <Tab.Screen name="Menu" component ={MenuScreen} 
            options = {{
              title: 'Menu',
              headerShown: true, 
              
            }} 
        />
        <Tab.Screen name="Reservation" component ={ReservationScreen} 
            options = {{
              title: 'Reservation',
              headerShown: true, 
            }} 
        />
    </Tab.Navigator>
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
