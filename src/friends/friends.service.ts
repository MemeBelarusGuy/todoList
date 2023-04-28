import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../users/schemas/user.schema";
import {Model, ObjectId} from "mongoose";

@Injectable()
export class FriendsService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
    }

    async getFriends(id: ObjectId) {
        try {
            const user = await this.UserModel.findById(id);
            if (!user) {
                return {
                    "message": "User Doesn't Exist"
                }
            }
            const friendsID = [...user.friends];
            const friends = [];
            for (let key of friendsID) {
                let friend = await this.UserModel.findById(key);
                friends.push(friend);
            }
            return friends;
        } catch (e) {
            console.log(e);
            return {
                "message": "Error Getting Friends"
            }
        }
    }
    //delete friend equal delete request /users/:id within body userId
}