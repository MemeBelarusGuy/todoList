import {TaskAction, TaskActionTypes, TaskState} from "@/types/task";


const initialState: TaskState = {
    items: []
}
export const taskReducer = (state = initialState, action: TaskAction): TaskState => {
    switch (action.type) {
        case TaskActionTypes.GET_ALL_TASKS:
            return {
                ...state,
                items: action.payload.items,
            }
        case TaskActionTypes.UPDATE_TASK:
            return {
                ...state,
                items: [...state.items.filter(item => item._id != action.payload._id), action.payload]
            }
        case TaskActionTypes.CREATE_TASK:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case TaskActionTypes.DELETE_TASK:
            return {
                ...state,
                items: [...state.items.filter(item => item._id != action.payload)]
            }
        default: {
            return state
        }
    }

}