import {ObjectId} from "mongoose";

export class DeleteProfileDto {
    readonly userId:ObjectId;
    readonly password:string;
}