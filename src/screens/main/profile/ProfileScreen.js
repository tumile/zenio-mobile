import store from "lib/redux/store"
import { logout } from "lib/redux/user/actions"
import React, { Component } from "react"
import { Image, StyleSheet, View } from "react-native"
import { Button, Headline, Text } from "react-native-paper"
import { connect } from "react-redux"
import colors from "res/colors"

class ProfileScreen extends Component {
    static navigationOptions = () => ({
        headerLeft: (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginHorizontal: 15
                    }}
                    source={{ uri: store.getState().user.photo }}
                />
                <Headline>Profile</Headline>
            </View>
        )
    })

    handleLogout = () => {
        this.props.logout()
        this.props.navigation.navigate("Signin")
    }

    render() {
        const {
            user: { givenName, familyName, photo }
        } = this.props
        return (
            <View style={styles.containerPaddingCenter}>
                <View style={styles.center}>
                    <Image style={styles.photo} source={{ uri: photo }} />
                    <Text>{`This is ${givenName} ${familyName}'s profile`}</Text>
                </View>
                <Button
                    mode="contained"
                    dark={true}
                    uppercase={false}
                    onPress={this.handleLogout}>
                    Sign Out
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerPaddingCenter: {
        flex: 1,
        padding: 15,
        justifyContent: "space-around"
    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.primary
    }
})

export default connect(
    ({ user }) => ({
        user
    }),
    { logout }
)(ProfileScreen)
