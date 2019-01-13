import { loadRooms } from "lib/redux/roomlist/actions"
import React from "react"
import { ActivityIndicator, FlatList, View } from "react-native"
import { FAB } from "react-native-paper"
import Entypo from "react-native-vector-icons/Entypo"
import { connect } from "react-redux"
import colors from "res/colors"
import ViewErrorWrapper from "../ViewErrorWrapper"
import RoomListItem from "./RoomListItem"

class RoomListScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Entypo size={22} name="chat" color={tintColor} />
        )
    }

    state = {
        loading: false,
        loadingMore: false
    }

    componentDidMount() {
        this.handleLoadRooms(0)
    }

    handleLoadRooms = skip => {
        this.setState(
            prev => ({ ...prev, loading: true }),
            () =>
                this.props.loadRooms(skip).then(() =>
                    this.setState(prev => ({
                        ...prev,
                        loading: false
                    }))
                )
        )
    }

    handleLoadMore = () => {
        if (!this.state.loadingMore && this.props.canLoadMore) {
            this.setState(
                prev => ({ ...prev, loadingMore: true }),
                () =>
                    this.props.loadRooms(this.props.skip).then(() =>
                        this.setState(prev => ({
                            ...prev,
                            loadingMore: false
                        }))
                    )
            )
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
                }}
            >
                <ActivityIndicator />
            </View>
        ) : null
    }

    render() {
        return (
            <ViewErrorWrapper>
                <FlatList
                    data={this.props.rooms}
                    keyExtractor={({ _id }) => _id}
                    renderItem={this.renderItem}
                    initialNumToRender={10}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={() => this.handleLoadRooms(0)}
                    refreshing={this.state.loading}
                    onEndReached={this.handleLoadMore}
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
            </ViewErrorWrapper>
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
