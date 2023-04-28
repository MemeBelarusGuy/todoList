import {UserAction, UserActionTypes, UserState} from "@/types/user";


const initialState: UserState = {
    _id: null,
    name: null,
    password: null,
    friends: [],
    list: [],
    status:""
}
export const authReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.LOGIN:
            return {
                ...state,
                _id: action.payload._id,
                name: action.payload.name,
                password: action.payload.password.split('').reverse().join(''),
                friends: action.payload.friends,
                list: action.payload.list,
                status:action.payload.status
            }
        case UserActionTypes.REGISTER:
            return {
                ...state,
                _id: action.payload._id,
                name: action.payload.name,
                password: action.payload.password.split('').reverse().join(''),
                friends: action.payload.friends,
                list: action.payload.list,
                status:action.payload.status
            }
        case UserActionTypes.LOGOUT:
            return {
                _id: null,
                name: null,
                password: null,
                friends:[],
                list:[],
                status:""
            }
        case UserActionTypes.EDIT_STATUS:
            return{
                _id: null,
                name: null,
                password: null,
                friends:[],
                list:[],
                status:action.payload
            }
        default: {
            return state
        }
    }

}