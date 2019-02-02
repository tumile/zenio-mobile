import { INVALID_EMAIL, REMOVE_USER, SET_USER } from "lib/constants"
import { setAuthHeader } from "lib/apiCall"
import { addError, removeError } from "lib/redux/error/actions"
import { setupSocket } from "lib/socket-io"

export const setUser = user => ({
    type: SET_USER,
    user
})

const removeUser = () => ({
    type: REMOVE_USER
})

export const authenticate = (path, data) => {
    return (dispatch, _, { apiCall }) => {
        return new Promise((resolve, reject) => {
            if (!isValidEmail(data.email)) {
                dispatch(addError({ type: INVALID_EMAIL }))
                reject()
            } else {
                apiCall(`/auth/${path}`, "post", data)
                    .then(async user => {
                        dispatch(removeError())
                        setAuthHeader(user.token)
                        setupSocket(user.token)
                        dispatch(setUser(user))
                        resolve()
                    })
                    .catch(error => {
                        dispatch(addError(error))
                        reject()
                    })
            }
        })
    }
}

export const logout = () => {
    return dispatch => {
        setAuthHeader(null)
        setupSocket(null)
        dispatch(removeUser())
    }
}

const isValidEmail = email => {
    return email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}
