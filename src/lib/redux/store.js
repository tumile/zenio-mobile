import apiCall from "lib/apiCall"
import emit from "lib/socket-io"
import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import { persistReducer, persistStore } from "redux-persist"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"

import error from "./error/reducers"
import roomlist from "./roomlist/reducers"
import search from "./search/reducers"
import user from "./user/reducers"

const rootReducer = combineReducers({
    roomlist,
    user,
    error,
    search
})

const persistedReducer = persistReducer(
    {
        key: "root",
        storage,
        stateReconciler: autoMergeLevel2,
        blacklist: ["search", "error"]
    },
    rootReducer
)

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk.withExtraArgument({ apiCall, emit }))
)

export const persistor = persistStore(store)

export default store
