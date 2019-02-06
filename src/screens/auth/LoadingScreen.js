import { setAuthHeader } from "lib/apiCall"
import { setupSocket } from "lib/socket-io"
import React from "react"
import { connect } from "react-redux"
import Loading from "../../components/Loading"

class LoadingScreen extends React.Component {
    componentDidMount() {
        const token = this.props.token
        if (!token) {
            this.props.navigation.navigate("Signin")
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

export default connect(({ user: { token } }) => ({ token }))(LoadingScreen)
