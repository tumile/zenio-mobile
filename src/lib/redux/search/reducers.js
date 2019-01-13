import {
    RESET_SEARCH,
    FIND_USERS,
    SELECT_USER,
    DESELECT_USER
} from "lib/constants"

const initialState = {
    selected: [],
    results: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FIND_USERS:
            return { ...state, results: action.users }
        case SELECT_USER:
            return {
                results: state.results.filter(
                    item => item._id !== action.user._id
                ),
                selected: [action.user, ...state.selected]
            }
        case DESELECT_USER:
            return {
                results: [action.user, ...state.results],
                selected: state.selected.filter(
                    item => item._id !== action.user._id
                )
            }
        case RESET_SEARCH:
            return initialState
        default:
            return state
    }
}
