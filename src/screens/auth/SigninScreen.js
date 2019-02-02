import { EMAIL_NOT_FOUND, INVALID_EMAIL, WRONG_PASSWORD } from "lib/constants"
import { authenticate } from "lib/redux/user/actions"
import React, { Component } from "react"
import { SafeAreaView, TouchableOpacity } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Button, HelperText, Text, TextInput } from "react-native-paper"
import { connect } from "react-redux"

class SigninScreen extends Component {
    state = {
        email: "",
        password: "",
        loading: false
    }

    handleAuth = () => {
        const { email, password } = this.state
        this.setState({ loading: true })
        this.props
            .authenticate("login", { email, password })
            .then(() => this.props.navigation.navigate("Main"))
            .catch(() => this.setState({ loading: false }))
    }

    render() {
        const { email, password, loading } = this.state
        const {
            error: { type, message },
            navigation: { navigate }
        } = this.props
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ padding: 15 }}
                    resetScrollToCoords={{ x: 0, y: 0 }}>
                    <HelperText
                        style={{ fontSize: 14 }}
                        type="error"
                        visible={!!message}>
                        {message}
                    </HelperText>
                    <TextInput
                        style={{ backgroundColor: "transparent" }}
                        label="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        error={
                            type === INVALID_EMAIL || type === EMAIL_NOT_FOUND
                        }
                        value={email}
                        onChangeText={text =>
                            this.setState(prev => ({ ...prev, email: text }))
                        }
                    />
                    <TextInput
                        style={{ backgroundColor: "transparent" }}
                        label="Password"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        error={type === WRONG_PASSWORD}
                        value={password}
                        onChangeText={text =>
                            this.setState(prev => ({ ...prev, password: text }))
                        }
                    />
                    <Button
                        style={{ marginVertical: 15 }}
                        mode="contained"
                        dark={true}
                        uppercase={false}
                        disabled={
                            [email, password].some(i => i === "") || loading
                        }
                        loading={loading}
                        onPress={this.handleAuth}>
                        Sign In
                    </Button>
                    <TouchableOpacity
                        style={{ marginTop: 15 }}
                        hitSlop={{ left: 10, bottom: 20, right: 10 }}
                        onPress={() => {
                            navigate("Signup")
                        }}>
                        <Text>Don't have an account? Sign up now!</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        )
    }
}

export default connect(
    ({ error }) => ({ error }),
    { authenticate }
)(SigninScreen)
