import React from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import colors from "res/colors"

class Message extends React.PureComponent {
    render() {
        const { author, content, first, last, roomMembers, userId } = this.props
        const { firstName, avatar } = roomMembers.find(
            item => item._id === author
        )
        const mine = author === userId
        return (
            <View style={mine ? styles.right : styles.left}>
                {!mine && last ? (
                    <Text style={styles.author}>{firstName}</Text>
                ) : null}
                <View
                    style={[
                        styles.container,
                        {
                            backgroundColor: mine
                                ? colors.primary
                                : colors.lightgray
                        }
                    ]}
                >
                    <Text
                        style={{
                            color: mine ? "white" : "black",
                            fontSize: 15
                        }}
                    >
                        {content}
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
    author: {
        fontSize: 12,
        color: colors.gray
    }
})

export default Message
