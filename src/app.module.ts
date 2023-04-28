import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./users/users.module";
import {FriendsModule} from "./friends/friends.module";
import {TaskModule} from "./tasks/task.module";
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
    imports:[
        MongooseModule.forRoot(`${process.env.MONGO_URL}`),
        AuthModule,
        UserModule,
        FriendsModule,
        TaskModule
    ]
})
export class AppModule{}