import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as PhotoActions } from "../../redux/modules/photos";

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          submit : (file, capture, location, tags ) => {
               return dispatch(PhotoActions.uploadPhoto(file, capture, location, tags));
          }
     }
}

export default connect(null, mapDispatchToProps)(Container);