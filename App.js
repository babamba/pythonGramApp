import React from 'react';
import { AppLoading, Asset, Font } from "expo";
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons"

export default class App extends React.Component {

  state = {
    isLoadingComplete : false
  }
  render() {
    const { isLoadingComplete} = this.state;
    if(!isLoadingComplete){
      return (
              <AppLoading
                startAsync={this._loadAssetAsync}
                onError={this._handleFinishError}
                onFinish={this._handleFinishLoading}
              />
            )
    }

    return (
      <View style={styles.container}>
        <Text>아오!! Open up App.js to start working on your app!!!</Text>
      </View>
    );
  }
}

_loadAssetAsync = async() => {
  return Promise.all([
    Asset.loadAsync([
      require("./assets/images/logo.png")
    ]),
    Font.loadAsync([
      ...Ionicons.font,
      ...MaterialIcons.font
    ])
  ]);
}
_handleFinishError = error => {
  console.error(error)
}
_handleFinishLoading = async() => {
  this.setState({
    isLoadingComplete : true
  })
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
