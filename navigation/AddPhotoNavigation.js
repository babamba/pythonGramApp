import React from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator, createAppContainer} from "react-navigation";
import CameraScreen from "../screens/CameraScreen"
import LibraryScreen from "../screens/LibraryScreen"
import { ifIphoneX } from 'react-native-iphone-x-helper'

const AddPhotoNavigation = createMaterialTopTabNavigator (
     {
          Camara: {
               screen : CameraScreen,
               navigationOptions:{
                    tabBarLabel:"Photo"
               }
          },
          Library: {
               screen : LibraryScreen,
               navigationOptions:{
                    tabBarLabel:"Library"
               }
          }
     },
     {
          initialRouteName: 'Camara',
          activeColor: '#f0edf6',
          inactiveColor: '#3e2465',
          barStyle: { backgroundColor: '#694fad' },
          tabBarPosition:"top",
          swipeEnabled:true,
          animationEnabled:true,
          tabBarOptions: {
               style: {
                 backgroundColor: 'blue',
                 ...ifIphoneX({
                    paddingTop: 50
                }, {
                    paddingTop: 20
                })
               },
             }
     },
);

export default createAppContainer(AddPhotoNavigation)