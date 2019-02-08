import React , { Component }from "react";
import PropTypes from "prop-types";
import Profile from "../../components/Profile";
import { Text } from "react-native";

class Container extends Component {
     static navigationOptions = ({navigation}) => ({
          headerTitle: navigation.state.params.user.username
     });
     constructor(props){
          super(props);
          const { navigation : { state : { params : { user } } } } = this.props;
          this.state = {
               profileObject: user
          }
     }
     componentDidMount = () => {
          this._getProfile();
     };

     render(){
          //console.log(this.props);
          const { profileObject } = this.state;
          console.log(" render():::::" + JSON.stringify(profileObject));
          return <Profile {...this.state} refresh={this._getProfile}/>
     }
     
     _getProfile = async () => {
          const { getProfile } = this.props;
          const { profileObject : { username } } = this.state;
          const completeProfile = await getProfile(username);
          console.log("_getProfile::::::" + completeProfile)
          if(completeProfile.username){
               this.setState({ profileObject: completeProfile })
          }
     }
}

export default Container;