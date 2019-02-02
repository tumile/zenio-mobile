import React, { PureComponent } from "react"
import { Image, View } from "react-native"
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
        if (messages.length > 0) {
            latestMess = {
                ...messages[0],
                from: members.find(item => item._id === messages[0].from)
            }
        }
        if (latestMess && latestMess.from._id !== userId)
            photos.push(latestMess.from.photo)
        let rand
        while (photos.length < 2) {
            rand = members[Math.floor(Math.random() * members.length)]
            if (rand._id !== userId && !photos.includes(rand.photo))
                photos.unshift(rand.photo)
        }
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
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 20
                    }}>
                    {photos.length > 1 ? (
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                key={photos[0]}
                                style={{
                                    position: "absolute",
                                    top: -27,
                                    left: -5,
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    backgroundColor: "white",
                                    borderWidth: 1.5,
                                    borderColor: colors.primary
                                }}
                                source={{ uri: photos[0] }}
                            />
                            <Image
                                key={photos[1]}
                                style={{
                                    position: "absolute",
                                    top: -17,
                                    left: 10,
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    backgroundColor: "white",
                                    borderWidth: 1.5,
                                    borderColor: colors.primary
                                }}
                                source={{ uri: photos[1] }}
                            />
                        </View>
                    ) : (
                        <Image
                            style={{
                                position: "absolute",
                                left: 17,
                                width: 54,
                                height: 54,
                                borderRadius: 17,
                                backgroundColor: "white",
                                borderWidth: 1.5,
                                borderColor: colors.primary
                            }}
                            source={{ uri: photos[0] }}
                        />
                    )}
                    <View style={{ marginLeft: 70 }}>
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

export default RoomListItem
