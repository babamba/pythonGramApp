import React from "react";
import PropTypes from "prop-types";
import { View, Text, ScrollView, RefreshControl, StyleSheet, Dimensions } from "react-native";
//import Photo from "../../components/Photo";
import SquarePhoto from "../../components/SquarePhoto";

const {width, height} = Dimensions.get("window");

const SearchScreen = props => (
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
               {props.search && props.search.length === 0 && props.searchingBy.length > 1 ? (
                    <Text style={styles.notFound}>No images found of {props.searchingBy}</Text>
                    ): props.search.map(photo => <SquarePhoto key={photo.id} imageURL = {photo.file} />)
               }
    </View>
    
    </ScrollView>
);

const styles = StyleSheet.create({
     container : {
          flex:1,
          flexDirection: "row",
          flexWrap:"wrap"
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

SearchScreen.propTypes = {
     isFetching : PropTypes.bool.isRequired,
     refresh: PropTypes.func.isRequired,
     search : PropTypes.array.isRequired
}

export default SearchScreen;