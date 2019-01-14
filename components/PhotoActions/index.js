import React from "react";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";

//피드스크린을 가져와서 네비게이션 prop을 포토에게 전달. => 포토에서 포토액션으로 전달 하는 방식이 있음 ( ex= screenProps)
// navigation prop을 FeedScreen =>  Photo => PhotoActions로 넘겨주는방식은 비효율적이기 때문에 withNavigation을 씀
// Photo 컴포넌트에서 좋아요 및 코멘트 화면으로 점프하기 위해 만든 액션 컴포넌트 
const PhotoActions = props => (
     <View style={styles.container}>
          <View style={styles.actions}>
               <TouchableOpacity onPressOut={props.handlePress}>
                    <View style={styles.action}>
                         <Ionicons name={props.is_liked ? 
                              "ios-heart" : "ios-heart-empty"} 
                              size={30} 
                              color={props.is_liked ? "#eb4b59" : "black"} />
                    </View>
               </TouchableOpacity>
               <TouchableOpacity onPressOut={() => props.navigation.navigate("Comments")} >
                    <View style={styles.action}>
                         <Ionicons name={"ios-text"} 
                              size={30} 
                              color={"black"} />
                    </View>
               </TouchableOpacity>
          </View>
          <TouchableOpacity onPressOut={() => props.navigation.navigate("Likes")} >
               <View >
                    <Text style={styles.likes}>{props.like_count} {props.like_count === 1? "like": "likes" }</Text>
               </View>
          </TouchableOpacity>
     </View>
)
const styles = StyleSheet.create({
     container: {
       marginTop: 5
     },
     actions: {
       flexDirection: "row"
     },
     action: {
       marginRight: 10
     },
     likes: {
       fontWeight: "600",
       fontSize: 14
     }
});

PhotoActions.propTypes = {
     is_liked: PropTypes.bool.isRequired,
     like_count:PropTypes.number.isRequired,
     handlePress : PropTypes.func.isRequired
}

export default withNavigation(PhotoActions);