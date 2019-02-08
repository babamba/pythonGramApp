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
          swipeEnabled:true,
          animationEnabled:true,
          tabBarOptions: {
               showLabel:true,
               upperCaseLabel:true,
               style: {
                 ...ifIphoneX({paddingTop: 50}, {paddingTop: 20}),
                 backgroundColor: 'white',
               },
               labelStyle:{
                    fontSize:14,
                    fontWeight:"600",
                    color:"black"
               }
             }
     },
);

export default createAppContainer(AddPhotoNavigation)