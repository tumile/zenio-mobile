import { loadMessages, newMessage } from "lib/redux/roomlist/actions"
import React, { Component } from "react"
import {
    ActivityIndicator,
    FlatList,
    Platform,
    TextInput,
    View
} from "react-native"
import { IconButton } from "react-native-paper"
import { connect } from "react-redux"
import colors from "res/colors"
import Message from "./Message"

class RoomScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam("roomName"),
        headerStyle: {
            backgroundColor: colors.primary
        },
        headerTitleStyle: {
            fontWeight: Platform.OS === "ios" ? "500" : "300"
        },
        headerTintColor: "white"
    })

    state = {
        sendLoading: false,
        input: ""
    }

    componentDidMount() {
        this.props.loadMessages(this.props.roomId, 0)
    }

    renderItem = ({ item, index }) => {
        let first = false,
            last = false
        if (index === 0 || this.props.messages[index - 1].from !== item.from)
            first = true
        if (
            index === this.props.messages.length - 1 ||
            this.props.messages[index + 1].from !== item.from
        )
            last = true
        return (
            <Message
                {...item}
                first={first}
                last={last}
                userId={this.props.userId}
                roomMembers={this.props.members}
            />
        )
    }

    handleNewMessage = () => {
        if (this.state.input) {
            this.setState({ sendLoading: true })
            this.props
                .newMessage(this.props.roomId, this.state.input.trim())
                .then(() =>
                    this.setState({
                        sendLoading: false,
                        input: ""
                    })
                )
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    inverted
                    contentContainerStyle={{ padding: 10 }}
                    data={this.props.messages}
                    keyExtractor={({ _id }) => _id}
                    renderItem={this.renderItem}
                    initialNumToRender={10}
                />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        // height: 50,
                        paddingLeft: 10,
                        paddingRight: 15,
                        borderTopColor: colors.lightgray,
                        borderTopWidth: 1.25
                    }}>
                    <TextInput
                        style={{
                            flex: 1,
                            marginRight: 15,
                            marginVertical: 5,
                            paddingVertical: 5,
                            paddingHorizontal: 15,
                            borderColor: colors.lightgray,
                            borderWidth: 1.25,
                            borderRadius: 15,
                            fontSize: 15
                        }}
                        multiline={true}
                        value={this.state.input}
                        onChangeText={text => this.setState({ input: text })}
                    />
                    <View style={{ width: 30 }}>
                        {this.state.sendLoading ? (
                            <ActivityIndicator />
                        ) : (
                            <IconButton
                                icon="send"
                                size={25}
                                style={{ margin: 0 }}
                                color={colors.primary}
                                onPress={this.handleNewMessage}
                            />
                        )}
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (
    { roomlist: { rooms }, user: { userId } },
    { navigation }
) => {
    const roomId = navigation.getParam("roomId")
    const { messages, members } = rooms.find(item => item._id === roomId)
    return { messages, members, roomId, userId }
}

export default connect(
    mapStateToProps,
    { loadMessages, newMessage }
)(RoomScreen)
