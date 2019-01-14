import React, { Component } from "react";
import SearchScreen from "./presenter";
import SearchBar from "../../components/SearchBar";

class Container extends Component {
     static navigationOptions = ({ navigation }) => {
          // 네비게이션 state의 params를 가지고 submit 함수 전달 
          const { params } = navigation.state;
          console.log("params" ,params)
          console.log("navigation" ,navigation)
          console.log("navigation.state" ,navigation.state)

          // navigation Object {
          //      [12:57:04]   "actions": Object {
          //      [12:57:04]     "dismiss": [Function dismiss],
          //      [12:57:04]     "goBack": [Function goBack],
          //      [12:57:04]     "navigate": [Function navigate],
          //      [12:57:04]     "pop": [Function pop],
          //      [12:57:04]     "popToTop": [Function popToTop],
          //      [12:57:04]     "push": [Function push],
          //      [12:57:04]     "replace": [Function replace],
          //      [12:57:04]     "reset": [Function reset],
          //      [12:57:04]     "setParams": [Function setParams],
          //      [12:57:04]   },

          //"state": Object {
          // [12:57:04]     "key": "id-1547438211454-1",
          // [12:57:04]     "params": Object {
          // [12:57:04]       "submitSearch": [Function anonymous],
          // [12:57:04]     },
          // [12:57:04]     "routeName": "Search",
          // [12:57:04]   },
          return {
               headerTitle : <SearchBar submit={text => params.submitSearch(text)} />
          }
     }
     state = {
          searchingBy : ""
     }
     componentDidMount() {
          //스크린이 리액트 네비게이션의 자손이면 navigation props를 가짐.
          const { navigation } = this.props;
          navigation.setParams({
               submitSearch: this._submitSearch
          })
     }

     render(){
          return <SearchScreen {...this.state}/>;
     }
     // _submitSearch 함수를 검색바 컴포넌트에 
     // 네비게이션에 파라미터로 전달함(navigation.setParams)
     _submitSearch = text => {
          const { searchingBy } = this.state;
          console.log("before",this.state);
          this.setState({
               searchingBy : text
          })
     }
}

export default Container;