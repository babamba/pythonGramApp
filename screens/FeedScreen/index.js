import React from "react";
import { View, Text} from "react-native";

const FeedScreen = props => <Text onPress={() => props.navigation.navigate("Comments")}>Feed</Text>;

export default FeedScreen;