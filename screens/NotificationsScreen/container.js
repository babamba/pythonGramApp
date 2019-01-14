import React, {Component} from "react";
import PropTypes from "prop-types";
import NotificationsScreen from "./presenter";

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })
     static propTypes = {
          notifications : PropTypes.array,
          getNotifications : PropTypes.func.isRequired
     };

     state = {
          isFetching : false
     };

     componentWillReceiveProps = nextProps => {
          if(nextProps.notifications){
               this.setState({
                    isFetching : false
               })
          }
     }
     render() {
          return (
               <NotificationsScreen 
                    {...this.props} 
                    {...this.state} 
                    refresh={this._refresh} 
               />
          );
     }

     _refresh = () => {
          const { getNotifications } = this.props;
          this.setState({
               isFetching : true
          });
          getNotifications();
          console.log("isFetch refresh")
     }

}
export default Container;