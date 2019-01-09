import LikesScreen from "../screens/LikesScreen";
import CommentsScreen from "../screens/CommentsScreen";

//공통요소들
const sharedRoutes = {
     Likes: {
          screen : LikesScreen
     },
     Comments : {
          screen : CommentsScreen
     }
}

const sharedOptions = {
     navigationOptions:{
          headerStyle:{
               backgroundColor:"#FBFBFB"
          }
     }
};

export { sharedOptions };

export default sharedRoutes