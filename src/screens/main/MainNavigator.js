import {
    createAppContainer,
    createStackNavigator,
    createMaterialTopTabNavigator
} from "react-navigation"
import colors from "res/colors"
import ProfileScreen from "./profile/ProfileScreen"
import CreateRoomScreen from "./rooms/CreateRoomScreen"
import RoomListScreen from "./rooms/RoomListScreen"
import RoomScreen from "./rooms/RoomScreen"
import WalletScreen from "./wallet/WalletScreen"

const MainTabs = createMaterialTopTabNavigator(
    {
        Wallet: WalletScreen,
        RoomList: RoomListScreen,
        Profile: ProfileScreen
    },
    {
        initialRouteName: "RoomList",
        optimizationsEnabled: true,
        tabBarOptions: {
            activeTintColor: colors.primary,
            inactiveTintColor: colors.gray,
            showIcon: true,
            showLabel: false,
            indicatorStyle: { backgroundColor: colors.primary },
            style: { backgroundColor: "white" }
        }
    }
)

export default createAppContainer(
    createStackNavigator(
        {
            Room: RoomScreen,
            CreateRoom: CreateRoomScreen,
            Main: {
                screen: MainTabs,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            initialRouteName: "Main"
        }
    )
)
