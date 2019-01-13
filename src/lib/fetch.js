import axios from "axios"
import { NO_INTERNET_CONNECTION, ROUTE } from "lib/constants"
import { NetInfo } from "react-native"

export const setAuthHeader = token => {
    if (token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    else delete axios.defaults.headers.common["Authorization"]
}

export default (fetch = (path, method, data) => {
    return new Promise((resolve, reject) => {
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected)
                axios[method](`${ROUTE}${path}`, data)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.response.data.error))
            else reject({ type: NO_INTERNET_CONNECTION })
        })
    })
})
