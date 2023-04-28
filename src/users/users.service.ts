import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {Model, ObjectId} from "mongoose";
import {AddUserDto} from "./data-transfer-object/add-user.dto";
import {EditStatusDto} from "./data-transfer-object/edit-status.dto";
import {DeleteProfileDto} from "./data-transfer-object/delete-profile.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
    }

    async getAll() {
        try {
            const data = await this.UserModel.find();
            return data;
        } catch (e) {
            console.log(e);
            return {
                "message": "Error Getting Users"
            }
        }
    }

    async deleteProfile({userId,password}:DeleteProfileDto) {
        try {
            const user=await this.UserModel.findById(userId);
            const decryptPassword = user.password.split('').reverse().join('');
            if (decryptPassword !== password) {
                return {
                    "message": "Incorrect Login Or Password"
                }
            }
            await this.UserModel.findByIdAndDelete(userId);
            return {
                "message":"Profile Deleted!"
            }

        } catch (e) {
            console.log(e);
            return {
                "message": "Error Deleting Profile"
            }
        }
    }

    async getOne(id: ObjectId) {
        try {
            const user = await this.UserModel.findById(id);
            //due to using TS if we try users/123 it's going to give http 500 error
            //this occurs since we have to put user id same length as ObjectId.
            //if we try change correct user id it's going to return User Doesn't Exist
            if (!user) {
                return {
                    "message": "User Doesn't Exist"
                }
            }
            return user;
        } catch (e) {
            console.log(e);
            return {
                "message": "Error Getting User"
            }
        }
    }

    async addUser({userId}: AddUserDto, id: ObjectId) {
        try {
            const firstUser = await this.UserModel.findById(userId);
            const secondUser = await this.UserModel.findById(id);
            if (!firstUser || !secondUser) {
                return {
                    "message": "Error Adding Friend"
                }
            }
            firstUser.friends.push(id);
            secondUser.friends.push(userId);
            await firstUser.save();
            await secondUser.save();
            return {
                "message": "Friend Added"
            }
        } catch (e) {
            console.log(e);
            return {
                "message": "Error Adding Friend"
            }
        }
    }

    async deleteFriend({userId}: AddUserDto, id: ObjectId) {
        try {
            const firstUser = await this.UserModel.findById(userId);
            const secondUser = await this.UserModel.findById(id);
            if (!firstUser || !secondUser) {
                return {
                    "message": "Error Deleting Friend"
                }
            }
            firstUser.friends = firstUser.friends.filter(item => item != id);
            secondUser.friends = secondUser.friends.filter(item => item != userId);
            await firstUser.save();
            await secondUser.save();
            return {
                "message": "Friend Deleted"
            }
        } catch (e) {
            console.log(e);
            return {
                "message": "Error Deleting User"
            }
        }
    }

    async editStatus({status}: EditStatusDto, id: ObjectId) {
        try {
            const user = await this.UserModel.findByIdAndUpdate(id, {
                status
            })
            if (!user) {
                return {
                    "message": "User Doesn't Exist"
                }
            }
            return {
                "message": "Status Successfully Changed!"
            }
        } catch (e) {
            console.log(e);
            return {
                "message": "Error Editing Status"
            }
        }
    }
}