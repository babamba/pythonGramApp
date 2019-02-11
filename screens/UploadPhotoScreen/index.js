import { connect } from "react-redux";
import Container from "./container";

// const mapStateToProps = (state, ownProps) => {
//      const { photos : { search } } = state;
//      return {
//           search
//      }
// };

// const mapDispatchToProps = (dispatch, ownProps) => {
//      return {
//           getEmptySearch : () => {
//                dispatch(PhotoActions.getSearch());
//           },
//           searchHashtag : hashtag => {
//                dispatch(PhotoActions.searchByHashtag(hashtag));
//           }
//      }
// }

export default connect()(Container);