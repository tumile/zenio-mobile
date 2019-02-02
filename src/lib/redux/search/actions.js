import {
    DESELECT_USER,
    FIND_USERS,
    RESET_SEARCH,
    SELECT_USER
} from "lib/constants"
import { addError, removeError } from "../error/actions"

export const resetSearch = () => ({
    type: RESET_SEARCH
})

export const selectUser = user => ({
    type: SELECT_USER,
    user
})

export const deselectUser = user => ({
    type: DESELECT_USER,
    user
})

export const findUsers = searchVal => {
    return (dispatch, getState, { apiCall }) => {
        const {
            search: { selected }
        } = getState()
        apiCall("/users/find", "post", { searchVal, selected })
            .then(({ users }) => {
                dispatch(removeError())
                dispatch({
                    type: FIND_USERS,
                    users
                })
            })
            .catch(error => dispatch(addError(error)))
    }
}
