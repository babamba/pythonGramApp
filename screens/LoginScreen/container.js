import React, {Component} from "react";
import { Alert } from "react-native"
import LogInScreen from "./presenter";
import PropTypes from "prop-types";
import { FB_APP_ID } from "../../constant";

class Container extends Component {

     state = {
          username : "",
          password : "",
          isSubmiting : false
     }

     static propsType = {
          login:PropTypes.func.isRequired,
          fbLogin:PropTypes.func.isRequired
     }

     render(){
          return (
                    <LogInScreen 
                         {...this.state } 
                         changeUsername = {this._changeUsername}
                         changePassword = {this._changePassword}
                         submit={this._submit}
                         fbLogin={this.props.fbLogin}
                    />
               );
     }

     _changeUsername = text => {
          this.setState({ username : text });
     }

     _changePassword = text => {
          this.setState({ password : text });
     }

     _submit = async() => {
          const { username, password, isSubmiting } = this.state;
          const { login } = this.props;
          if(!isSubmiting){
               if(username && password){
                    //submit
                    this.setState({
                         isSubmiting : true
                    })
                    //redux action  결과값을 얻는방식으로 할수 있는게 더생김
                    const loginResult = await login(username, password)
                    if(!loginResult){
                         Alert.alert('Something went wrong, try again');
                         this.setState({
                              isSubmiting : false
                         });
                    }
               }else{
                    Alert.alert('All fileds are require')
               }
          }
     }
}

export default Container;