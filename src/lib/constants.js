// url
// export const ROUTE = "https://tandapay-chatserver.herokuapp.com"
export const ROUTE = "http://10.255.248.197:4000"

// action types
export const SET_USER = "SET_USER"
export const REMOVE_USER = "REMOVE_USER"

export const LOAD_ROOMS = "LOAD_ROOMS"
export const ADD_ROOM = "ADD_ROOM"
export const NEW_ROOM = "NEW_ROOM"

export const LOAD_MESSAGES = "LOAD_MESSAGES"
export const ADD_MESSAGE = "ADD_MESSAGE"
export const NEW_MESSAGE = "NEW_MESSAGE"

export const ADD_ERROR = "ADD_ERROR"
export const REMOVE_ERROR = "REMOVE_ERROR"

export const FIND_USERS = "FIND_USERS"
export const SELECT_USER = "SELECT_USER"
export const DESELECT_USER = "DESELECT_USER"
export const RESET_SEARCH = "RESET_SEARCH"

// error types
export const NO_INTERNET_CONNECTION = "NO_INTERNET_CONNECTION"
export const EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND"
export const EMAIL_TAKEN = "EMAIL_TAKEN"
export const INVALID_EMAIL = "INVALID_EMAIL"
export const INVALID_PASSWORD = "INVALID_PASSWORD"
export const DATABASE_ERROR = "DATABASE_ERROR"
export const UNAUTHORIZED = "UNAUTHORIZED"
export const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
export const ERROR = "ERROR" // arbitrary error for socket io
