export interface UserState {
    _id: null | string;
    name: null | string;
    password?: null | string,
    list: [],
    friends: [],
    status: string
}

export enum UserActionTypes {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
    LOGOUT = "LOGOUT",
    EDIT_STATUS = "EDIT_STATUS"
}

interface LoginAction {
    type: UserActionTypes.LOGIN,
    payload: UserState
}

interface RegisterAction {
    type: UserActionTypes.REGISTER
    payload: UserState
}

interface LogoutAction {
    type: UserActionTypes.LOGOUT
}

interface EditStatusAction {
    type: UserActionTypes.EDIT_STATUS,
    payload: string
}

export type UserAction =
    LoginAction
    | RegisterAction
    | LogoutAction
    | EditStatusAction