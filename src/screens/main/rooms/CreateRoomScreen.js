import { newRoom } from "lib/redux/roomlist/actions"
import { deselectUser, findUsers, selectUser } from "lib/redux/search/actions"
import store from "lib/redux/store"
import React from "react"
import { FlatList, Image, StyleSheet, TextInput, View } from "react-native"
import { Button, Text, TouchableRipple } from "react-native-paper"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { connect } from "react-redux"
import colors from "res/colors"
import ViewErrorWrapper from "../ViewErrorWrapper"

class CreateRoomScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: colors.primary
            },
            headerTintColor: "white",
            headerTitle: (
                <TextInput
                    style={{ flex: 1, color: "white" }}
                    placeholder="Search user"
                    placeholderTextColor="white"
                    autoFocus={true}
                    onChangeText={text => {
                        store.dispatch(findUsers(text))
                    }}
                />
            ),
            headerRight: (
                <Button
                    color="white"
                    loading={!!navigation.getParam("loading", "")}
                    onPress={() =>
                        navigation.setParams({
                            creating:
                                store.getState().userSearch.selected.length > 0
                        })
                    }
                >
                    Create
                </Button>
            )
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.navigation.getParam("creating") !==
            prevProps.navigation.getParam("creating")
        ) {
            if (this.props.selected.length > 0) {
                this.props.navigation.setParams({ loading: true })
                this.props
                    .newRoom()
                    .then(() => this.props.navigation.navigate("RoomList"))
            }
        }
    }

    renderSelectedItem = ({ item }) => (
        <View style={styles.selectedItemContainer}>
            <Image
                style={styles.selectedAvatar}
                source={{ uri: item.avatar }}
            />
            <Text style={{ marginHorizontal: 5 }}>
                {`${item.firstName} ${item.lastName}`}
            </Text>
            <TouchableRipple
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
                onPress={() =>
                    requestAnimationFrame(() => this.props.deselectUser(item))
                }
            >
                <MaterialIcons name="cancel" size={16} color={colors.gray} />
            </TouchableRipple>
        </View>
    )

    renderResultItem = ({ item }) => (
        <TouchableRipple
            onPress={() =>
                requestAnimationFrame(() => this.props.selectUser(item))
            }
        >
            <View style={styles.resultItemContainer}>
                <Image
                    style={styles.resultAvatar}
                    source={{ uri: item.avatar }}
                />
                <Text style={{ fontSize: 16 }}>
                    {`${item.firstName} ${item.lastName}`}
                </Text>
            </View>
        </TouchableRipple>
    )

    render() {
        return (
            <ViewErrorWrapper>
                <View style={{ flexDirection: "row" }}>
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        horizontal={true}
                        data={this.props.selected}
                        keyExtractor={({ _id }) => _id}
                        renderItem={this.renderSelectedItem}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <FlatList
                    keyboardShouldPersistTaps="handled"
                    data={this.props.results}
                    keyExtractor={({ _id }) => _id}
                    renderItem={this.renderResultItem}
                />
            </ViewErrorWrapper>
        )
    }
}

const styles = StyleSheet.create({
    selectedItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 2
    },
    selectedAvatar: {
        height: 25,
        width: 25,
        borderRadius: 50
    },
    resultItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    resultAvatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginRight: 15
    }
})

export default connect(
    ({ userSearch: { results, selected } }) => ({
        results,
        selected
    }),
    { newRoom, selectUser, deselectUser }
)(CreateRoomScreen)
