import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../users/schemas/user.schema";
import {TaskController} from "./task.controller";
import {TaskService} from "./task.service";
import {Task, TaskSchema} from "./schemas/task.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}])
    ],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule {
}