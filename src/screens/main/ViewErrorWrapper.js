import { removeError } from "lib/redux/error/actions"
import React from "react"
import { Text, View } from "react-native"
import { connect } from "react-redux"
import colors from "res/colors"

class ViewErrorWrapper extends React.Component {
    state = {
        displaying: false
    }

    timer = null

    componentDidUpdate(prevProps) {
        if (this.props.message && prevProps.message !== this.props.message) {
            this.setState({ displaying: true })
            this.timer = setTimeout(() => {
                this.setState({ displaying: false })
                this.props.removeError()
            }, 2000)
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.displaying ? (
                    <View
                        style={{
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            backgroundColor: colors.error
                        }}
                    >
                        <Text style={{ color: "white" }}>
                            {this.props.message}
                        </Text>
                    </View>
                ) : null}
                {this.props.children}
            </View>
        )
    }
}

export default connect(
    ({ error: { message } }) => ({
        message
    }),
    { removeError }
)(ViewErrorWrapper)
