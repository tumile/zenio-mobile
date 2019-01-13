import { createSwitchNavigator } from "react-navigation"
import LoginScreen from "./LoginScreen"
import SignupScreen from "./SignupScreen"

export default createSwitchNavigator(
    {
        Login: LoginScreen,
        Signup: SignupScreen
    },
    {
        initialRouteName: "Login"
    }
)
