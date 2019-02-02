import React from "react"
import { ActivityIndicator, View } from "react-native"
import colors from "res/colors"

const Loading = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    )
}

export default Loading
