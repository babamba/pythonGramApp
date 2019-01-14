import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as PhotoActions } from "../../redux/modules/photos";

const mapStateToProps = (state, ownProps) => {
     const { photos : { search } } = state;
     return {
          search
     }
};

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          getEmptySearch : () => {
               dispatch(PhotoActions.getSearch());
          },
          searchHashtag : hashtag => {
               dispatch(PhotoActions.searchByHashtag(hashtag));
          }
     }
}

export default connect(mapStateToProps,mapDispatchToProps)(Container);