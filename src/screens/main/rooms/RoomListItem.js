import React from "react"
import { View, Image } from "react-native"
import { TouchableRipple, Text } from "react-native-paper"
import colors from "res/colors"

class RoomListItem extends React.PureComponent {
    render() {
        const {
            _id: roomId,
            messages,
            members,
            navigateRoom,
            userId
        } = this.props
        let latestMess = null,
            avatars = []
        if (messages.length > 0) {
            latestMess = {
                ...messages[0],
                author: members.find(item => item._id === messages[0].author)
            }
        }
        if (latestMess && latestMess.author._id !== userId)
            avatars.push(latestMess.author)
        avatars = members.reduce((acc, cur) => {
            if (acc.length > 1 || cur._id === userId) return acc
            return [cur, ...acc]
        }, avatars)
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
                          item.firstName +
                          (index !== arr.length - 1 ? ", " : ""),
                      ""
                  )

        return (
            <TouchableRipple
                onPress={() =>
                    requestAnimationFrame(() => navigateRoom(roomName, roomId))
                }
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 15
                    }}
                >
                    {avatars.length > 1 ? (
                        avatars.map((item, index) => (
                            <Image
                                key={item._id}
                                style={{
                                    position: "absolute",
                                    left: 11 + 8 * index,
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,
                                    backgroundColor: "white",
                                    borderWidth: 1.5,
                                    borderColor: colors.primary
                                }}
                                source={{ uri: item.avatar }}
                            />
                        ))
                    ) : (
                        <Image
                            style={{
                                position: "absolute",
                                left: 15,
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                backgroundColor: "white",
                                borderWidth: 1.5,
                                borderColor: colors.primary
                            }}
                            source={{ uri: avatars[0].avatar }}
                        />
                    )}
                    <View style={{ marginLeft: 65 }}>
                        <Text style={{ fontSize: 16 }}>{roomName}</Text>
                        <Text style={{ color: colors.gray }}>
                            {latestMess
                                ? `${latestMess.author.firstName}: ${
                                      latestMess.content
                                  }`
                                : "Start chatting!"}
                        </Text>
                    </View>
                </View>
            </TouchableRipple>
        )
    }
}

export default RoomListItem
