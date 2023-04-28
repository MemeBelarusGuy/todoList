import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../users/schemas/user.schema";
import {FriendsController} from "./friends.controller";
import {FriendsService} from "./friends.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    controllers: [FriendsController],
    providers: [FriendsService]
})
export class FriendsModule {
}