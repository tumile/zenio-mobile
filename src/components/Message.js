import React, { PureComponent } from "react"
import { Dimensions, Image, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import colors from "res/colors"

class Message extends PureComponent {
    render() {
        const { from, msg, first, last, roomMembers, userId } = this.props
        const { givenName, photo } = roomMembers.find(item => item._id === from)
        if (from === userId)
            return (
                <View
                    style={[
                        styles.container,
                        styles.right,
                        {
                            backgroundColor: colors.primary
                        }
                    ]}>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 15
                        }}>
                        {msg}
                    </Text>
                </View>
            )
        return (
            <View style={styles.left}>
                <View style={{ width: 40 }}>
                    {first ? (
                        <Image
                            style={{
                                marginBottom: 2,
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                borderWidth: 0.75,
                                borderColor: colors.primary
                            }}
                            source={{ uri: photo }}
                        />
                    ) : null}
                </View>
                <View>
                    {last ? <Text style={styles.from}>{givenName}</Text> : null}
                    <View
                        style={[
                            styles.container,
                            {
                                backgroundColor: colors.lightgray
                            }
                        ]}>
                        <Text
                            style={{
                                color: "black",
                                fontSize: 15
                            }}>
                            {msg}
                        </Text>
                    </View>
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
        flexDirection: "row",
        alignSelf: "flex-start",
        alignItems: "flex-end"
    },
    right: {
        alignSelf: "flex-end",
        alignItems: "flex-end"
    },
    from: {
        marginLeft: 2,
        fontSize: 12,
        color: colors.gray
    }
})

export default Message
