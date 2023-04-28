import {ObjectId} from "mongoose";

export class CreateTaskDto {
    readonly userId:ObjectId;
    readonly title:string;
    readonly done:number;
    //createdAt:will setted to Date.now() while creating or updating task
    readonly finishAt:number;
}