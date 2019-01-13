import {
    ADD_MESSAGE,
    ADD_ROOM,
    LOAD_MESSAGES,
    LOAD_ROOMS,
    NEW_MESSAGE,
    NEW_ROOM
} from "lib/constants"
import { addError } from "lib/redux/error/actions"

export const addRoom = room => ({
    type: ADD_ROOM,
    room
})

export const addMessage = (roomId, message) => {
    return (dispatch, getState, { fetch }) => {
        const {
            user: { userId },
            roomlist: { rooms }
        } = getState()
        const index = rooms.findIndex(item => item._id === roomId)
        if (index === -1) {
            fetch(`/users/${userId}/rooms/${roomId}`, "get").then(
                ({ room }) => {
                    dispatch(addRoom(room))
                    dispatch({
                        type: ADD_MESSAGE,
                        index: 0,
                        message
                    })
                }
            )
        } else
            dispatch({
                type: ADD_MESSAGE,
                index,
                message
            })
    }
}

export const loadRooms = skip => {
    return (dispatch, getState, { fetch }) => {
        const {
            user: { userId }
        } = getState()
        return fetch(`/users/${userId}/rooms`, "get", {
            params: { skip }
        })
            .then(({ rooms, canLoadMore }) =>
                dispatch({
                    type: LOAD_ROOMS,
                    skip,
                    rooms: rooms.map(item => ({ ...item, skip: 0 })),
                    canLoadMore
                })
            )
            .catch(error => dispatch(addError(error)))
    }
}

export const loadMessages = (roomId, skip) => {
    return (dispatch, getState, { fetch }) => {
        const {
            user: { userId }
        } = getState()
        return fetch(`/users/${userId}/rooms/${roomId}/messages`, "get", {
            params: { skip }
        })
            .then(({ messages }) =>
                dispatch({
                    type: LOAD_MESSAGES,
                    roomId,
                    messages
                })
            )
            .catch(error => dispatch(addError(error)))
    }
}

export const newRoom = () => {
    return (dispatch, getState, { emit }) => {
        return new Promise((resolve, reject) => {
            const {
                user: { userId },
                search: { selected }
            } = getState()
            const room = {
                members: [
                    userId,
                    ...selected.reduce((acc, cur) => [...acc, cur._id], [])
                ]
            }
            emit(NEW_ROOM, room, function(error) {
                if (error) {
                    dispatch(addError(error))
                    reject()
                } else {
                    resolve()
                }
            })
        })
    }
}

export const newMessage = (roomId, content) => {
    return (dispatch, _, { emit }) => {
        return new Promise((resolve, reject) => {
            emit(NEW_MESSAGE, { roomId, content }, function(error) {
                if (error) {
                    dispatch(addError(error))
                    reject()
                } else {
                    resolve()
                }
            })
        })
    }
}
