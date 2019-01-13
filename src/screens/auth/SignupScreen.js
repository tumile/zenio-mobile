// import { removeError } from "lib/redux/error/actions"
import { authenticate } from "lib/redux/user/actions"
import { EMAIL_TAKEN, INVALID_EMAIL } from "lib/constants"
import React from "react"
import { TouchableOpacity, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Button, HelperText, Text, TextInput } from "react-native-paper"
import { connect } from "react-redux"

class SignupScreen extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        loading: false
    }

    handleAuth = () => {
        const { firstName, lastName, email, password } = this.state
        this.setState(
            prev => ({
                ...prev,
                loading: true
            }),
            () => {
                this.props
                    .authenticate("signup", {
                        firstName,
                        lastName,
                        email,
                        password
                    })
                    .then(() => this.props.navigation.navigate("Main"))
                    .catch(() =>
                        this.setState(prev => ({ ...prev, loading: false }))
                    )
            }
        )
    }

    render() {
        const { firstName, lastName, email, password, loading } = this.state
        const {
            error: { type, message },
            navigation: { navigate }
            // removeError
        } = this.props
        return (
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ padding: 15 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
                <HelperText
                    style={{ fontSize: 14 }}
                    type="error"
                    visible={!!message}
                >
                    {message}
                </HelperText>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={{
                            backgroundColor: "transparent",
                            flex: 1,
                            marginRight: 2.5
                        }}
                        label="First Name"
                        value={firstName}
                        onChangeText={text =>
                            this.setState(prev => ({
                                ...prev,
                                firstName: text
                            }))
                        }
                    />
                    <TextInput
                        style={{
                            backgroundColor: "transparent",
                            flex: 1,
                            marginLeft: 2.5
                        }}
                        label="Last Name"
                        value={lastName}
                        onChangeText={text =>
                            this.setState(prev => ({ ...prev, lastName: text }))
                        }
                    />
                </View>
                <TextInput
                    style={{ backgroundColor: "transparent" }}
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={type === INVALID_EMAIL || type === EMAIL_TAKEN}
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
                    value={password}
                    onChangeText={text =>
                        this.setState(prev => ({ ...prev, password: text }))
                    }
                />
                <Button
                    style={{ marginVertical: 15 }}
                    mode="contained"
                    dark={true}
                    disabled={
                        [firstName, lastName, email, password].some(
                            i => i === ""
                        ) || loading
                    }
                    loading={loading}
                    onPress={this.handleAuth}
                >
                    Signup
                </Button>
                <TouchableOpacity
                    style={{ marginTop: 15 }}
                    hitSlop={{ left: 10, bottom: 20, right: 10 }}
                    onPress={() => {
                        // removeError()
                        navigate("Login")
                    }}
                >
                    <Text>Already have an account?</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        )
    }
}

export default connect(
    ({ error }) => ({ error }),
    { authenticate }
)(SignupScreen)
