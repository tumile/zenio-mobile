import { loadRooms } from "lib/redux/roomlist/actions"
import store from "lib/redux/store"
import React, { Component } from "react"
import { ActivityIndicator, FlatList, Image, View } from "react-native"
import { FAB, Headline } from "react-native-paper"
import { connect } from "react-redux"
import colors from "res/colors"
import RoomListItem from "./RoomListItem"

class RoomListScreen extends Component {
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
                <Headline>Chats</Headline>
            </View>
        )
    })

    state = {
        loading: false,
        loadingMore: false
    }

    componentDidMount() {
        this.loadFirstRooms()
    }

    loadFirstRooms = () => {
        this.setState({ loading: true })
        this.props.loadRooms(0).then(() => this.setState({ loading: false }))
    }

    loadMoreRooms = () => {
        if (!this.state.loadingMore && this.props.canLoadMore) {
            this.setState({ loadingMore: true })
            this.props
                .loadRooms(this.props.skip)
                .then(() => this.setState({ loadingMore: false }))
        }
    }

    renderItem = ({ item }) => {
        return (
            <RoomListItem
                {...item}
                userId={this.props.userId}
                navigateRoom={this.navigateRoom}
            />
        )
    }

    navigateRoom = (roomName, roomId) => {
        this.props.navigation.navigate("Room", { roomName, roomId })
    }

    navigateCreate = () => {
        requestAnimationFrame(() =>
            this.props.navigation.navigate("CreateRoom")
        )
    }

    renderFooter = () => {
        return this.state.loadingMore ? (
            <View
                style={{
                    paddingVertical: 20
                }}>
                <ActivityIndicator />
            </View>
        ) : null
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.rooms}
                    keyExtractor={({ _id }) => _id}
                    renderItem={this.renderItem}
                    initialNumToRender={10}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.loadFirstRooms}
                    refreshing={this.state.loading}
                    onEndReached={this.loadMoreRooms}
                    onEndReachedThreshold={0.1}
                />
                <FAB
                    style={{
                        position: "absolute",
                        margin: 16,
                        right: 0,
                        bottom: 0,
                        backgroundColor: colors.primary
                    }}
                    color="white"
                    icon="add"
                    onPress={this.navigateCreate}
                />
            </View>
        )
    }
}

export default connect(
    ({ roomlist: { skip, rooms, canLoadMore }, user: { userId } }) => ({
        skip,
        rooms,
        canLoadMore,
        userId
    }),
    { loadRooms }
)(RoomListScreen)
