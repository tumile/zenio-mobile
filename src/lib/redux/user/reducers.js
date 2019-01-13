import { SET_USER, REMOVE_USER } from "lib/constants"

const initialState = {
    userId: "",
    firstName: "",
    lastName: "",
    avatar: "",
    token: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return action.user
        case REMOVE_USER:
            return initialState
        default:
            return state
    }
}
