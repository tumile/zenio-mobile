import { NEW_MESSAGE, NEW_ROOM, ROUTE } from "lib/constants"
import { addMessage, addRoom } from "lib/redux/roomlist/actions"
import store from "lib/redux/store"
import io from "socket.io-client"

let socket = null

export default (emit = (type, data, callback) => {
    if (socket) socket.emit(type, data, callback)
})

export const setupSocket = token => {
    if (token) {
        socket = io(ROUTE, {
            path: "/sockets",
            query: {
                token
            }
        })

        socket.on(NEW_ROOM, room => {
            store.dispatch(addRoom(room))
        })

        socket.on(NEW_MESSAGE, ({ roomId, message }) => {
            store.dispatch(addMessage(roomId, message))
        })
    } else socket = null
}
