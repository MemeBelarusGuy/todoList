import axios from "@/axios";
import {Dispatch} from "react";
import {TaskAction, TaskActionTypes} from "@/types/task";

export const getTasks = (userId: string | null) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        try {
            const response = await axios.get(`/${userId}`,);
            await dispatch({type: TaskActionTypes.GET_ALL_TASKS, payload: response.data})
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}
export const editTasks = (fields: any) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        try {
            const response = await axios.patch(`/`, fields);
            await dispatch({type: TaskActionTypes.UPDATE_TASK, payload: fields})
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}
export const addTasks = (fields: any) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        try {
            const response = await axios.post(`/`, fields);
            await dispatch({type: TaskActionTypes.CREATE_TASK, payload: fields})
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}
export const deleteTask = (fields: any) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        try {
            const response = await axios.delete('/', {
                    data: {
                        taskId: fields.taskId,
                        userId: fields.userId
                    }
                }
            );
            await dispatch({type: TaskActionTypes.DELETE_TASK, payload: fields.taskId})
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}