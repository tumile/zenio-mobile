import { EMAIL_TAKEN, INVALID_EMAIL } from "lib/constants"
import { authenticate } from "lib/redux/user/actions"
import React from "react"
import { SafeAreaView, View } from "react-native"
import { Button, HelperText, TextInput, Title } from "react-native-paper"
import { connect } from "react-redux"

class SignupScreen extends React.Component {
    state = {
        givenName: "",
        familyName: "",
        email: "",
        password: "",
        loading: false
    }

    handleAuth = () => {
        const { givenName, familyName, email, password } = this.state
        this.setState({ loading: true })
        this.props
            .authenticate("signup", {
                givenName,
                familyName,
                email,
                password
            })
            .then(() => this.props.navigation.navigate("Main"))
            .catch(() => this.setState({ loading: false }))
    }

    render() {
        const { givenName, familyName, email, password, loading } = this.state
        const {
            error: { type, message }
        } = this.props
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{ flex: 1, padding: 20, justifyContent: "center" }}>
                    <Title>Create Account</Title>
                    <HelperText
                        style={{ fontSize: 14 }}
                        type="error"
                        visible={!!message}>
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
                            value={givenName}
                            onChangeText={text =>
                                this.setState({ givenName: text })
                            }
                        />
                        <TextInput
                            style={{
                                backgroundColor: "transparent",
                                flex: 1,
                                marginLeft: 2.5
                            }}
                            label="Last Name"
                            value={familyName}
                            onChangeText={text =>
                                this.setState({ familyName: text })
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
                        onChangeText={text => this.setState({ email: text })}
                    />
                    <TextInput
                        style={{ backgroundColor: "transparent" }}
                        label="Password"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={text => this.setState({ password: text })}
                    />
                    <Button
                        style={{ marginVertical: 15 }}
                        mode="contained"
                        dark={true}
                        uppercase={false}
                        disabled={
                            [givenName, familyName, email, password].some(
                                i => i === ""
                            ) || loading
                        }
                        loading={loading}
                        onPress={this.handleAuth}>
                        Sign Up
                    </Button>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(
    ({ error }) => ({ error }),
    { authenticate }
)(SignupScreen)
