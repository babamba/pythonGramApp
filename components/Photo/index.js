import { connect } from "react-redux";
import Conatiner from "./container";
import {actionCreators as photoActions} from "../../redux/modules/photos"

const mapDispatchToProps = (dispatch, ownProps) => {
     const { id, is_liked } = ownProps;
     return {
          dispatchLike : () => {
               console.log("like action : " + id);
               if(is_liked){
                    return dispatch(photoActions.unlikePhoto(id));
               }else{
                    return dispatch(photoActions.likePhoto(id));
               }
          }
     }
}

export default connect(null, mapDispatchToProps)(Conatiner);