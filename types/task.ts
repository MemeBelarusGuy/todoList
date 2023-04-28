export interface Task {
    _id: null|string;
    title: null|string;
    done: null|number,
    createdAt: null|number,
    finishAt: null|number,
}
export interface TaskState{
    items:Task[]
}
export enum TaskActionTypes {
    GET_ALL_TASKS = "GET_ALL_TASKS",
    CREATE_TASK = "CREATE_TASK",
    UPDATE_TASK = "UPDATE_TASK",
    DELETE_TASK = "DELETE_TASK"

}

interface GetAllTasksAction {
    type: TaskActionTypes.GET_ALL_TASKS,
    payload: TaskState
}

interface CreateTaskAction {
    type: TaskActionTypes.CREATE_TASK,
    payload: Task
}

interface UpdateTaskAction {
    type: TaskActionTypes.UPDATE_TASK,
    payload: Task
}

interface DeleteTaskAction {
    type: TaskActionTypes.DELETE_TASK,
    payload: string
}


export type TaskAction =
    GetAllTasksAction
    | CreateTaskAction
    | UpdateTaskAction
    | DeleteTaskAction