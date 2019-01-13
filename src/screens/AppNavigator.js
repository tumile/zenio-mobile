import React from "react"
import { removeError } from "lib/redux/error/actions"
import { resetSearch } from "lib/redux/search/actions"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { connect } from "react-redux"
import AuthNavigator from "./auth/AuthNavigator"
import LoadingScreen from "./LoadingScreen"
import MainNavigator from "./main/MainNavigator"

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
