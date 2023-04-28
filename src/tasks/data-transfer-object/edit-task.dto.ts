import {ObjectId} from "mongoose";

export class EditTaskDto {
    readonly taskId:ObjectId;
    readonly title:string;
    readonly done:number;
    readonly finishAt:number;
}