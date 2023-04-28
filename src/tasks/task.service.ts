import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../users/schemas/user.schema";
import {Model, ObjectId} from "mongoose";
import {Task, TaskDocument} from "./schemas/task.schema";
import {CreateTaskDto} from "./data-transfer-object/create-task.dto";
import {EditTaskDto} from "./data-transfer-object/edit-task.dto";
import {DeleteTaskDto} from "./data-transfer-object/delete-task.dto";

@Injectable()
export class TaskService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>,
                @InjectModel(Task.name) private TaskModel: Model<TaskDocument>) {
    }

    async getTasks(id: ObjectId) {
        try {
            const user = await this.UserModel.findById(id);
            if (!user) {
                return {
                    "message": "User Doesn't Exist"
                }
            }
            const tasksID = [...user.list];
            const tasks = [];
            for (let key of tasksID) {
                let task = await this.TaskModel.findById(key);
                tasks.push(task);
            }
            return tasks;
        } catch (e) {
            console.log(e);
            return {
                "message": "Error Getting User Tasks"
            }
        }
    }

    async addTask({userId, title, done, finishAt}: CreateTaskDto) {
        try {
            const user = await this.UserModel.findById(userId);
            if (!user) {
                return {
                    "message": "User Doesn't Exist"
                }
            }
            const task = await this.TaskModel.create({title, done, createdAt: Date.now(), finishAt})
            user.list.push(task._id.toString());
            await user.save()
            return {
                "message": "Task Added!"
            }
        } catch (e) {
            console.log(e);
            return {
                "message": "Error Adding Tasks"
            }
        }
    }

    async editTask({taskId, title, done, finishAt}: EditTaskDto) {
        try {
            const task = await this.TaskModel.findByIdAndUpdate(taskId, {
                title, done, createdAt: Date.now(), finishAt
            })
            if (!task) {
                return {
                    "message": "Error Updating Task"
                }
            }
            return {
                "message": "Task Updated!"
            }
        } catch (e) {
            console.log(e);
            return {
                "message": "Error Updating Task"
            }
        }
    }

    async deleteTask({taskId, userId}: DeleteTaskDto) {
        try {
            await this.TaskModel.findByIdAndRemove(taskId);
            console.log(userId);
            console.log(taskId);
            const user = await this.UserModel.findById(userId);
            if (!user) {
                return {
                    "message": "User Doesn't Exist"
                }
            }
            console.log(user);
            user.list = user.list.length?user.list.filter(item => item != taskId.toString()):user.list;
            await user.save();
            return {
                "message": "Task Deleted Successfully!"
            }
        } catch (e) {
            console.log(e);
            return {
                "message": "Error Deleting Task"
            }
        }
    }
}