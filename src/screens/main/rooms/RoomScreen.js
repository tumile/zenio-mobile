import { newMessage, loadMessages } from "lib/redux/roomlist/actions"
import React from "react"
import { ActivityIndicator, FlatList, TextInput, View } from "react-native"
import AndroidKeyboardAdjust from "react-native-android-keyboard-adjust"
import { IconButton } from "react-native-paper"
import { connect } from "react-redux"
import colors from "res/colors"
import ViewErrorWrapper from "../ViewErrorWrapper"
import Message from "./Message"

class RoomScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam("roomName"),
        headerTitleStyle: {
            fontSize: 18,
            fontWeight: "200"
        },
        headerStyle: {
            backgroundColor: colors.primary
        },
        headerTintColor: "white"
    })

    state = {
        sendLoading: false,
        input: ""
    }

    componentDidMount() {
        AndroidKeyboardAdjust.setAdjustResize()
        this.props.loadMessages(this.props.roomId, 0)
    }

    componentWillUnmount() {
        AndroidKeyboardAdjust.setAdjustPan()
    }

    renderItem = ({ item, index }) => {
        let first = false,
            last = false
        if (
            index === 0 ||
            this.props.messages[index - 1].author !== item.author
        )
            first = true
        if (
            index === this.props.messages.length - 1 ||
            this.props.messages[index + 1].author !== item.author
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
        if (this.state.input)
            this.setState(
                prev => ({ ...prev, sendLoading: true }),
                () => {
                    this.props
                        .newMessage(this.props.roomId, this.state.input)
                        .then(() =>
                            this.setState(prev => ({
                                ...prev,
                                sendLoading: false,
                                input: ""
                            }))
                        )
                }
            )
    }

    render() {
        return (
            <ViewErrorWrapper>
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
                        height: 50,
                        paddingLeft: 10,
                        paddingRight: 15,
                        borderTopColor: colors.lightgray,
                        borderTopWidth: 1.25
                    }}
                >
                    <TextInput
                        style={{
                            flex: 1,
                            marginRight: 15,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            borderColor: colors.lightgray,
                            borderWidth: 1.25,
                            borderRadius: 15
                        }}
                        onFocus={this.handleKeyboard}
                        value={this.state.input}
                        onChangeText={text =>
                            this.setState(prev => ({ ...prev, input: text }))
                        }
                    />
                    {this.state.sendLoading ? (
                        <ActivityIndicator size={28} />
                    ) : (
                        <IconButton
                            onPress={this.handleNewMessage}
                            style={{ margin: 0 }}
                            icon="send"
                            size={25}
                            color={colors.primary}
                        />
                    )}
                </View>
            </ViewErrorWrapper>
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
