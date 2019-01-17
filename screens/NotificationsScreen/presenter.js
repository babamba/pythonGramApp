import React from "react";
import PropTypes from "prop-types";
import { View, Text, ScrollView, RefreshControl, StyleSheet, Dimensions } from "react-native";
//import Photo from "../../components/Photo";
import Notification from "../../components/Notification";

const {width, height} = Dimensions.get("window");

const NotificationsScreen = props => (
     <ScrollView
          refreshControl = {
               <RefreshControl 
                    refreshing ={props.isFetching} 
                    onRefresh={props.refresh}
                    tintColor={"black"}
               />
          }
          // contentContainerStyle = {styles.container}
    >
    <View style={styles.container}>
          {/* {props.feed && 
               props.feed.map(photo => <Photo {...photo} key={photo.id} />)} */}
               {props.notifications.length === 0 && props.notifications.length > 1 ? (
                    <Text style={styles.notFound}>No notifications yet ! Come back soon</Text>
                    ) : props.notifications.map(notification => 
                         <Notification key={notification.id} {...notification} />
               )}
    </View>
    
    </ScrollView>
);

const styles = StyleSheet.create({
     container : {
          flex:1,
          backgroundColor:"white"
     },
     notFound: {
          color:"#bbb",
          width,
          fontWeight: '600',
          alignSelf: 'center',
          textAlign:"center",
          marginTop: 20,
     }

});

NotificationsScreen.propTypes = {
     isFetching : PropTypes.bool.isRequired,
     refresh: PropTypes.func.isRequired,
     notifications : PropTypes.array.isRequired
}

export default NotificationsScreen;