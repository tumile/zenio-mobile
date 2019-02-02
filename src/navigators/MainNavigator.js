import React from "react"
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator
} from "react-navigation"
import colors from "res/colors"
import ProfileScreen from "../screens/main/profile/ProfileScreen"
import CreateRoomScreen from "../screens/main/rooms/CreateRoomScreen"
import RoomListScreen from "../screens/main/rooms/RoomListScreen"
import RoomScreen from "../screens/main/rooms/RoomScreen"

const RoomsWithHeader = createStackNavigator({
    RoomsWithHeader: RoomListScreen
})

const ProfileWithHeader = createStackNavigator({
    ProfileWithHeader: ProfileScreen
})

const MainTabs = createBottomTabNavigator(
    {
        Rooms: {
            screen: RoomsWithHeader,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Entypo size={22} name="chat" color={tintColor} />
                )
            }
        },
        Profile: {
            screen: ProfileWithHeader,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome
                        size={20}
                        name="user-circle-o"
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        initialRouteName: "Rooms",
        optimizationsEnabled: true,
        lazy: false,
        tabBarOptions: {
            activeTintColor: colors.primary,
            inactiveTintColor: colors.gray,
            showIcon: true,
            showLabel: false
        }
    }
)

export default createAppContainer(
    createStackNavigator(
        {
            Room: RoomScreen,
            CreateRoom: CreateRoomScreen,
            Tabs: {
                screen: MainTabs,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            initialRouteName: "Tabs"
        }
    )
)
