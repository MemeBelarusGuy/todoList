import {ObjectId} from "mongoose";

export class DeleteTaskDto {
    readonly taskId:ObjectId;
    readonly userId:ObjectId;
}