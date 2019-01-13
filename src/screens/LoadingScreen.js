import { setAuthHeader } from "lib/fetch"
import { setupSocket } from "lib/socket-io"
import React from "react"
import { ActivityIndicator, View } from "react-native"
import { connect } from "react-redux"
import colors from "res/colors"

const Loading = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    )
}

class LoadingScreen extends React.Component {
    componentDidMount() {
        const token = this.props.token
        if (!token) {
            this.props.navigation.navigate("Auth")
        } else {
            setAuthHeader(token)
            setupSocket(token)
            this.props.navigation.navigate("Main")
        }
    }

    render() {
        return <Loading />
    }
}

export { Loading }

export default connect(({ user: { token } }) => ({ token }))(LoadingScreen)
