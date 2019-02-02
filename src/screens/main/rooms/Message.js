import React, { PureComponent } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import colors from "res/colors"

class Message extends PureComponent {
    render() {
        const { from, msg, first, last, roomMembers, userId } = this.props
        const { givenName, photo } = roomMembers.find(item => item._id === from)
        const mine = from === userId
        return (
            <View style={mine ? styles.right : styles.left}>
                {!mine && last ? (
                    <Text style={styles.from}>{givenName}</Text>
                ) : null}
                <View
                    style={[
                        styles.container,
                        {
                            backgroundColor: mine
                                ? colors.primary
                                : colors.lightgray
                        }
                    ]}>
                    <Text
                        style={{
                            color: mine ? "white" : "black",
                            fontSize: 15
                        }}>
                        {msg}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 15,
        margin: 2,
        maxWidth: Dimensions.get("window").width * 0.75
    },
    left: {
        alignSelf: "flex-start",
        alignItems: "flex-start"
    },
    right: {
        alignSelf: "flex-end",
        alignItems: "flex-end"
    },
    from: {
        fontSize: 12,
        color: colors.gray
    }
})

export default Message
