import store, { persistor } from "lib/redux/store"
import React from "react"
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper"
import { Provider as StoreProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import colors from "res/colors"
import Loading from "./components/Loading"
import App from "./navigators/AppNavigator"

const theme = {
    ...DefaultTheme,
    roundness: 15,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        text: colors.text,
        error: colors.error,
        placeholder: colors.gray,
        background: "white"
    }
}

export default () => {
    return (
        <StoreProvider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                <PaperProvider theme={theme}>
                    <App />
                </PaperProvider>
            </PersistGate>
        </StoreProvider>
    )
}
