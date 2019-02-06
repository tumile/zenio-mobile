import { removeError } from "lib/redux/error/actions"
import { resetSearch } from "lib/redux/search/actions"
import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { connect } from "react-redux"
import AuthNavigator from "./AuthNavigator"
import MainNavigator from "./MainNavigator"
import LoadingScreen from "../screens/auth/LoadingScreen"

const AppNavigator = createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            Main: MainNavigator,
            Auth: AuthNavigator
        },
        {
            initialRouteName: "Loading"
        }
    )
)

export default connect(
    () => ({}),
    { removeError, resetSearch }
)(({ removeError, resetSearch }) => (
    <AppNavigator
        onNavigationStateChange={() => {
            removeError()
            resetSearch()
        }}
    />
))
