//This is an example code for Bottom Navigation//
import React from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
//import all the basic component we have used
import Ionicons from 'react-native-vector-icons/Ionicons';
//import Ionicons to show the icon for bottom options
//For React Navigation 2.+ import following
//import {createStackNavigator,createBottomTabNavigator} from 'react-navigation';
//For React Navigation 3.+ import following
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
//import createStackNavigator, createBottomTabNavigator, createAppContainer in our project
import ShuffleScreen from './pages/shuffleScreen';
import ListScreen from './pages/listScreen';



const HomeStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    Home: { screen: ShuffleScreen },
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#2422a8',
      },
      headerTintColor: '#FFFFFF',
      title: 'Gerar Equipes',
      //Header title
    },
  }
);

const ListStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    List: { screen: ListScreen },
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#2422a8',
      },
      headerTintColor: '#FFFFFF',
      title: 'Histórico de Equipes',
      //Header title
    },
  }
);


const App = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    List: { screen: ListStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'List') {
          iconName = `ios-checkmark-circle${focused ? '' : '-outline'}`;
        } 
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#2422a8',
      inactiveTintColor: 'gray',
    },
  }
);
//For React Navigation 2.+ need to export App only
//export default App;

//For React Navigation 3.+
export default createAppContainer(App);