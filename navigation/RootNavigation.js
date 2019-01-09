import { createStackNavigator} from "react-navigation";
import TakePhotoScreen from "../screens/TakePhotoScreen"
import TabsNavigation from "./TabsNavigation";

const RootNavigator = createStackNavigator(
     {
          Tabs : {
               screen:TabsNavigation,
               navigationOptions:{
                    header:null
               }
          },
           TakePhoto : {
               screen : TakePhotoScreen,
               navigationOptions:{
                    header:null
               }
          }
     },
     {
          mode : "modal"
     }
);

export default RootNavigator;