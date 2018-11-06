import React, {Component} from "react";
import LogInScreen from "./presenter";

class Container extends Component {
     static navigationOption = ({ navigation }) => ({
          title : "Log in"
     })
     render(){
          return <LogInScreen />
     }
}

export default Container;