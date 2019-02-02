import { removeError } from "lib/redux/error/actions"
import { resetSearch } from "lib/redux/search/actions"
import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { connect } from "react-redux"
import AuthNavigator from "./AuthNavigator"
import MainNavigator from "./MainNavigator"

const AppNavigator = createAppContainer(
    createSwitchNavigator(
        {
            Main: MainNavigator,
            Auth: AuthNavigator
        },
        {
            initialRouteName: "Auth"
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
