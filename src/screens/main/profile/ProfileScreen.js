import { logout } from "lib/redux/user/actions"
import React from "react"
import { Image, View } from "react-native"
import { Button, Text } from "react-native-paper"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { connect } from "react-redux"
import colors from "res/colors"

class ProfileScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome size={20} name="user-circle-o" color={tintColor} />
        )
    }

    handleLogout = () => {
        this.props.logout().then(() => this.props.navigation.navigate("Auth"))
    }

    render() {
        const {
            user: { firstName, lastName, avatar }
        } = this.props
        return (
            <View
                style={{
                    flex: 1,
                    padding: 15,
                    justifyContent: "space-around"
                }}
            >
                <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            borderWidth: 2,
                            borderColor: colors.primary
                        }}
                        source={{ uri: avatar }}
                    />
                    <Text>{`This is ${firstName} ${lastName}'s account page`}</Text>
                </View>
                <Button
                    mode="contained"
                    dark={true}
                    onPress={this.handleLogout}
                >
                    Log out
                </Button>
            </View>
        )
    }
}

export default connect(
    ({ user }) => ({
        user
    }),
    { logout }
)(ProfileScreen)
