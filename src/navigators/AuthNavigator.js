import { createSwitchNavigator } from "react-navigation"
import LoadingScreen from "../screens/auth/LoadingScreen"
import SigninScreen from "../screens/auth/SigninScreen"
import SignupScreen from "../screens/auth/SignupScreen"

export default createSwitchNavigator(
    {
        Loading: LoadingScreen,
        Signin: SigninScreen,
        Signup: SignupScreen
    },
    {
        initialRouteName: "Loading"
    }
)
