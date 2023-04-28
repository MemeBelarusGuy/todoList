import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {User,UserSchema} from "./schemas/user.schema";
import {StatusController, UserController} from "./users.controller";
import {UserService} from "./users.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ],
    controllers: [UserController,StatusController],
    providers: [UserService]
})
export class UserModule {}