import { ADD_MESSAGE, ADD_ROOM, LOAD_MESSAGES, LOAD_ROOMS } from "lib/constants"

const initialState = {
    skip: 0,
    rooms: [],
    canLoadMore: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ROOMS:
            return {
                skip: action.skip + action.rooms.length,
                rooms:
                    action.skip === 0
                        ? action.rooms
                        : [...state.rooms, ...action.rooms],
                canLoadMore: action.canLoadMore
            }
        case ADD_ROOM:
            return {
                ...state,
                skip: state.skip + 1,
                rooms: [action.room, ...state.rooms]
            }
        case ADD_MESSAGE:
            const room = {
                ...state.rooms[action.index],
                messages: [
                    action.message,
                    ...state.rooms[action.index].messages
                ]
            }
            return {
                ...state,
                rooms: [
                    room,
                    ...state.rooms.slice(0, action.index),
                    ...state.rooms.slice(action.index + 1)
                ]
            }
        case LOAD_MESSAGES:
            return {
                ...state,
                rooms: state.rooms.map(item =>
                    item._id === action.roomId
                        ? {
                              ...item,
                              skip: item.skip + action.messages.length,
                              messages:
                                  item.skip === 0
                                      ? action.messages
                                      : [...item.messages, ...action.messages]
                          }
                        : item
                )
            }
        default:
            return state
    }
}
