import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import HomeRoute from "../routes/HomeRoute";
import SearchRoute from "../routes/SearchRoute";
import NotificationsRoute from "../routes/NotificationsRoute";
import ProfileRoute from "../routes/ProfileRoute";
import { Ionicons } from "@expo/vector-icons";


const defaultScreen = props => <Text>Search</Text>;
const TabsNavigation = createBottomTabNavigator (
     {
          Home : {
               screen : HomeRoute,
               navigationOptions:{
                    tabBarIcon: ({ focused }) => (
                         <Ionicons
                           name={focused ? 'ios-checkmark-circle-outline' : 'ios-home'}
                           size={30}
                           color={"black"}
                         />
                    )
               }
          },
          Search : {
               screen : SearchRoute,
               navigationOptions:{
                    tabBarIcon: ({ focused }) => (
                         <Ionicons
                           name={focused ? 'ios-checkmark-circle-outline' : 'ios-search'}
                           size={30}
                           color={"black"}
                         />
                    )
               }
          },
          AddPhoto : {
               screen : defaultScreen,
               navigationOptions: ({navigation}) => ({
                    tabBarIcon: ({ focused }) => (
                         <Ionicons
                           name={'ios-add-circle-outline'}
                           size={30}
                           color={"black"}
                         />
                    ),
                    tabBarOnPress: () => {
                         navigation.navigate("TakePhoto");
                    }
               })
          },
          Notifications:{
               screen:NotificationsRoute,
               navigationOptions:{
                    tabBarIcon: ({ focused }) => (
                         <Ionicons
                           name={focused ? 'ios-checkmark-circle-outline' : 'ios-heart'}
                           size={30}
                           color={"black"}
                         />
                    )
               }
          },
          Profile: {
               screen : ProfileRoute,
               navigationOptions:{
                    tabBarIcon: ({ focused }) => (
                         <Ionicons
                           name={focused ? 'ios-checkmark-circle-outline' : 'ios-person'}
                           size={30}
                           color={"black"}
                         />
                    )
               }
          }
     },
     {
          tabBarPosition: "bottom",
          tabBarOptions:{
               showLabel:false,
               swipeEnabled: true,
               animationEnabled: true,
               style:{
                    backgroundColor:"#FBFBFB",
                    height:45
               },
          },
     },
     
);

export default createAppContainer(TabsNavigation);