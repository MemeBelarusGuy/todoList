import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../users/schemas/user.schema";
import {Model} from "mongoose";
import {CreateUserDto} from "../users/data-transfer-object/create-user.dto";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
    }

    async register({name, password}: CreateUserDto) {
        try {
            const isExist = await this.UserModel.exists({name});
            if (!isExist) {
                if (name.length < 4) {
                    return {
                        "message": "Name Should Have 4+ Characters"
                    }
                }
                if (password.length < 8) {
                    return {
                        "message": "Password Should Have 8+ Characters"
                    }
                }
                const regExp = /[a-zA-Z0-9]/g;
                if (password.match(regExp) === null) {
                    return {
                        "message": "Password Must Contain Letters And Numbers"
                    }
                }
                const encryptPassword = password.split('').reverse().join('');
                const user = await this.UserModel.create({
                    name,
                    password: encryptPassword,
                    status: "I'm New User!",
                    list: [],
                    friends: []
                });
                return user;
            }
            return {
                "message": "User Already Exist"
            }
        } catch (e) {
            console.log(e);
            return {
                "message": "Error Creating New User"
            }
        }
    }

    async login(dto: CreateUserDto) {
        try {
            const user = await this.UserModel.findOne({name: dto.name});
            if (!user) {
                return {
                    "message": "Incorrect Login Or Password"
                }
            }
            const decryptPassword = user.password.split('').reverse().join('');
            if (decryptPassword !== dto.password) {
                return {
                    "message": "Incorrect Login Or Password"
                }
            }
            return user;
        } catch (e) {
            console.log(e);
            return {
                "message": "Error Of Authorization"
            }
        }
    }
}