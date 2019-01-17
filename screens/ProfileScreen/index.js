import { connect } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import Container from "./container";

//나자신의 프로필
const mapStateToProps = (state, ownProps) => {
     const { user : { profile } } = state;
     return {
          profile
     }
}

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          getOwnProfile : () => {
               dispatch(userActions.getOwnProfile());
          }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);