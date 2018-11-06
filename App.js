import React from 'react';
import { AppLoading, Asset, Font } from "expo";
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./redux/configureStore";
import AppContainer from "./components/AppContainer";

const { persistor, store } = configureStore();

class App extends React.Component {
  state = {
    isLoadingComplete: false
  };
  render() {
    const { isLoadingComplete } = this.state;
    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      // 컴포넌트는 이제 리덕스 provider가 있따.
      <Provider store={store}>
        {/* state에 rehydrated(수분을 공급하다? 물을주다? ) 되지 않으면 해당 컨텐츠를 보여주지 않음. 
            state를 어디선가 가지고온다 = rehydrate
            즉 스토어가 디스크에서 컨텐츠를 가져오면 persist gate가 열리고 해당 뷰를 얻게된다.
        */}
        <PersistGate persistor={persistor}>
         <AppContainer/>
        </PersistGate>
      </Provider>
    );
  }

  _loadAssetsAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/logo.png"),
        require("./assets/images/logo-white.png"),
        require("./assets/images/noPhoto.jpg"),
        require("./assets/images/photoPlaceholder.png")
      ]),
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font
      })
    ]);
  };
  _handleLoadingError = error => {
    console.error(error);
  };
  _handleFinishLoading = async () => {
    this.setState({
      isLoadingComplete: true
    });
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;