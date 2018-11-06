import { createStackNavigator } from "react-navigation";
import LogInScreen from "../screens/LoginScreen"

const LoggedOutnavigation = createStackNavigator({
     LogIn : {
          screen : LogInScreen,
          navigationOptions : {
               title: "Log In"
          }
     }
});

export default LoggedOutnavigation