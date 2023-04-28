import {Body, Controller, Delete, Get, Param, Patch, Post,} from "@nestjs/common";
import {TaskService} from "./task.service";
import {CreateTaskDto} from "./data-transfer-object/create-task.dto";
import {EditTaskDto} from "./data-transfer-object/edit-task.dto";
import {DeleteTaskDto} from "./data-transfer-object/delete-task.dto";
import {ObjectId} from "mongoose";

@Controller('/')
export class TaskController {
    constructor(private tasksService: TaskService) {}
    @Get(':id')
    getTasks(@Param('id') id: ObjectId){
        return this.tasksService.getTasks(id);
    }
    @Post()
    addTask(@Body() dto:CreateTaskDto){
        return this.tasksService.addTask(dto);
    }
    @Patch()
    editTask(@Body() dto:EditTaskDto){
        return this.tasksService.editTask(dto);
    }
    @Delete()
    deleteTask(@Body()dto:DeleteTaskDto){
        return this.tasksService.deleteTask(dto);
    }
}