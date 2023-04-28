import axios from "@/axios";
import {Dispatch} from "react";
import {UserAction, UserActionTypes} from "@/types/user";

export const fetchAuth=(fields:{name:string,password:string})=>{
    return async(dispatch:Dispatch<UserAction>)=>{
        try {
            const response=await axios.post("/auth/login",fields);
            dispatch({type:UserActionTypes.LOGIN,payload:response.data})
            return response;
        }catch (e) {
            console.log(e);
        }
    }
}
export const fetchRegister=(fields:{name:string,password:string})=>{
    return async(dispatch:Dispatch<UserAction>)=>{
        try {
            const response=await axios.post("/auth/register",fields);
            dispatch({type:UserActionTypes.REGISTER,payload:response.data})
            return response;
        }catch (e) {
            console.log(e);
        }
    }
}
export const fetchLogout=()=>{
    return (dispatch:Dispatch<UserAction>)=>{
        try {
            dispatch({type:UserActionTypes.LOGOUT})
            return "logout";
        }catch (e) {
            console.log(e);
        }
    }
}
export const editStatus=(id:string,fields:{status:string})=>{
    return async(dispatch:Dispatch<UserAction>)=>{
        try {
            const response=await axios.patch(`/status/${id}`,fields);
            dispatch({type:UserActionTypes.EDIT_STATUS,payload:fields.status})
            return response;
        }catch (e) {
            console.log(e);
        }
    }
}