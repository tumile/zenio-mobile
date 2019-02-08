import { createStackNavigator } from "react-navigation"
import SigninScreen from "../screens/auth/SigninScreen"
import SignupScreen from "../screens/auth/SignupScreen"

export default createStackNavigator(
    {
        Signin: {
            screen: SigninScreen,
            navigationOptions: {
                header: null
            }
        },
        Signup: SignupScreen
    },
    {
        initialRouteName: "Signin",
        navigationOptions: {
            header: {
                style: {
                    elevation: 0, //remove shadow on Android
                    shadowOpacity: 0 //remove shadow on iOS
                }
            }
        }
    }
)
