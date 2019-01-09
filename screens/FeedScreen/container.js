import React, {Component} from "react";
import FeedScreen from "./presenter";

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({

     // })
     render() {
          return <FeedScreen {...this.props} />;
     }
}
export default Container;