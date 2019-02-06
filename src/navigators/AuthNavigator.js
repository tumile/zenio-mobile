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
        defaultNavigationOptions: {
            headerStyle: {
                shadowOpacity: 0,
                shadowOffset: {
                    height: 0
                },
                shadowRadius: 0,
                elevation: 0
            }
        }
    }
)
