import { connect } from "react-redux";
import Conatiner from "./container";
import {actionCreators as photoActions} from "../../redux/modules/photos"

const mapDispatchToProps = (dispatch, ownProps) => {
     //const { id, is_liked } = ownProps;
     const { id } = ownProps;
     return {
          //dispatchLike : () => {
          //state 에서 가져오는걸로 변경.
          // 좋아요를 리덕스 스토어에 저장하지 않는 이유는
          // 포토 컴포넌트를 많은 스크린에서 사용할껀데 어떤스크린은 이기능을 사용하지 않기 때문.
          dispatchLike : (isLiked) => {
               console.log("like action : " + id , "isLiked : " + isLiked);
               if(isLiked){
                    return dispatch(photoActions.unlikePhoto(id));
               }else{
                    return dispatch(photoActions.likePhoto(id));
               }
          }
     }
}

export default connect(null, mapDispatchToProps)(Conatiner);