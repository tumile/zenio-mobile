import { newRoom } from "lib/redux/roomlist/actions"
import { deselectUser, findUsers, selectUser } from "lib/redux/search/actions"
import store from "lib/redux/store"
import React, { Component } from "react"
import { FlatList, Image, StyleSheet, TextInput, View } from "react-native"
import { Button, Text, TouchableRipple, Chip } from "react-native-paper"
import { connect } from "react-redux"
import colors from "res/colors"

class CreateRoomScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: colors.primary
        },
        headerTintColor: "white",
        headerTitle: (
            <TextInput
                style={{ flex: 1, padding: 10, color: "white", fontSize: 15 }}
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
                uppercase={false}
                loading={!!navigation.getParam("loading", "")}
                onPress={() =>
                    navigation.setParams({
                        creating: store.getState().search.selected.length > 0
                    })
                }>
                <Text style={{ fontSize: 15, color: "white" }}>Create</Text>
            </Button>
        )
    })

    componentDidUpdate(prevProps) {
        if (
            this.props.navigation.getParam("creating") !==
            prevProps.navigation.getParam("creating")
        ) {
            if (this.props.selected.length > 0) {
                this.props.navigation.setParams({ loading: true })
                this.props
                    .newRoom()
                    .then(() => this.props.navigation.navigate("Rooms"))
            }
        }
    }

    renderSelectedItem = item => (
        <Chip
            key={item._id}
            mode="outlined"
            style={{ marginTop: 5, marginLeft: 5 }}
            avatar={
                <Image
                    style={styles.photoSelected}
                    source={{ uri: item.photo }}
                />
            }
            onPress={() => this.props.deselectUser(item)}>
            {item.givenName} {item.familyName}
        </Chip>
    )

    renderResultItem = ({ item }) => (
        <TouchableRipple
            onPress={() =>
                requestAnimationFrame(() => this.props.selectUser(item))
            }>
            <View style={styles.containerResultItem}>
                <Image
                    style={styles.photoResult}
                    source={{ uri: item.photo }}
                />
                <Text style={{ fontSize: 16 }}>
                    {`${item.givenName} ${item.familyName}`}
                </Text>
            </View>
        </TouchableRipple>
    )

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {this.props.selected.map(this.renderSelectedItem)}
                </View>
                <FlatList
                    keyboardShouldPersistTaps="handled"
                    data={this.props.results}
                    keyExtractor={({ _id }) => _id}
                    renderItem={this.renderResultItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    photoSelected: {
        height: 30,
        width: 30,
        borderRadius: 15
    },
    containerResultItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    photoResult: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 15
    }
})

export default connect(
    ({ search: { results, selected } }) => ({
        results,
        selected
    }),
    { newRoom, selectUser, deselectUser }
)(CreateRoomScreen)
