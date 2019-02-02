import React, { PureComponent } from "react"
import { Image, View, Platform, StyleSheet } from "react-native"
import { Text, TouchableRipple } from "react-native-paper"
import colors from "res/colors"

class RoomListItem extends PureComponent {
    render() {
        const {
            _id: roomId,
            messages,
            members,
            navigateRoom,
            userId
        } = this.props
        let latestMess = null,
            photos = []

        // Find the latest mess and its sender
        if (messages.length > 0) {
            latestMess = {
                ...messages[0],
                from: members.find(item => item._id === messages[0].from)
            }
        }
        // If this is a private room, set room's photo as the other's photo
        if (members.length === 2)
            photos.push(
                members[0]._id !== userId ? members[0].photo : members[1].photo
            )
        else {
            // If there is a latest mess (not from user), set it as the first photo
            if (latestMess && latestMess.from._id !== userId)
                photos.push(latestMess.from.photo)
            let rand
            // Random the other(s)
            while (photos.length < 2) {
                rand = members[Math.floor(Math.random() * members.length)]
                if (rand._id !== userId && !photos.includes(rand.photo))
                    photos.unshift(rand.photo)
            }
        }

        // Construct room's name from members' names
        const roomName = this.props.roomName
            ? this.props.roomName
            : members
                  .reduce(
                      (acc, item) =>
                          item._id !== userId ? [...acc, item] : acc,
                      []
                  )
                  .reduce(
                      (acc, item, index, arr) =>
                          acc +
                          item.givenName +
                          (index !== arr.length - 1 ? ", " : ""),
                      ""
                  )

        return (
            <TouchableRipple
                onPress={() =>
                    requestAnimationFrame(() => navigateRoom(roomName, roomId))
                }>
                <View style={styles.container}>
                    {photos.length > 1 ? (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                            <Image
                                key={photos[0]}
                                style={styles.photoMultTop}
                                source={{ uri: photos[0] }}
                            />
                            <Image
                                key={photos[1]}
                                style={styles.photoMultBot}
                                source={{ uri: photos[1] }}
                            />
                        </View>
                    ) : (
                        <Image
                            style={styles.photoSingle}
                            source={{ uri: photos[0] }}
                        />
                    )}
                    <View style={{ marginLeft: 71 }}>
                        <Text style={{ fontSize: 16 }}>{roomName}</Text>
                        <Text
                            style={{ color: colors.gray }}
                            ellipsizeMode="tail"
                            numberOfLines={1}>
                            {latestMess
                                ? (latestMess.from._id === userId
                                      ? "Me: "
                                      : `${latestMess.from.givenName}: `) +
                                  latestMess.msg
                                : "Start chatting!"}
                        </Text>
                    </View>
                </View>
            </TouchableRipple>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15
    },
    photoMultTop: {
        position: "absolute",
        top: -28,
        left: -2,
        width: 44,
        height: 44,
        borderRadius: Platform.OS === "ios" ? 22 : 50,
        backgroundColor: "white",
        borderWidth: 1.5,
        borderColor: colors.primary
    },
    photoMultBot: {
        position: "absolute",
        top: -16,
        left: 14,
        width: 44,
        height: 44,
        borderRadius: Platform.OS === "ios" ? 22 : 50,
        backgroundColor: "white",
        borderWidth: 1.5,
        borderColor: colors.primary
    },
    photoSingle: {
        position: "absolute",
        left: 15,
        width: 56,
        height: 56,
        borderRadius: Platform.OS === "ios" ? 28 : 50,
        backgroundColor: "white",
        borderWidth: 1.5,
        borderColor: colors.primary
    }
})

export default RoomListItem
