import { createStackNavigator, createAppContainer } from "react-navigation";
import SearchScreen from "../screens/SearchScreen";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const SearchRoute = createStackNavigator(
     {
          Search:{
               screen: SearchScreen
          },
          ...sharedRoutes
     },
     {
          //...sharedOptions
     }
);

export default createAppContainer(SearchRoute);