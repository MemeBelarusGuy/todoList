import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {UserService} from "./users.service";
import {ObjectId} from "mongoose";
import {AddUserDto} from "./data-transfer-object/add-user.dto";
import {EditStatusDto} from "./data-transfer-object/edit-status.dto";
import {DeleteProfileDto} from "./data-transfer-object/delete-profile.dto";

@Controller('/users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getAll() {
        return this.userService.getAll();
    }
    @Delete()
    deleteProfile(@Body() dto:DeleteProfileDto){
        return this.userService.deleteProfile(dto);
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.userService.getOne(id);
    }

    @Post(':id')
    addUser(@Param('id') id: ObjectId, @Body() dto: AddUserDto) {
        return this.userService.addUser(dto, id);
    }

    @Delete(':id')
    deleteFriend(@Param('id') id: ObjectId, @Body() dto: AddUserDto) {
        return this.userService.deleteFriend(dto, id);
    }
}

@Controller('/status')
export class StatusController{
    constructor(private userService: UserService) {}
    @Patch(':id')
    editStatus(@Param('id')id:ObjectId,@Body()dto:EditStatusDto){
        return this.userService.editStatus(dto,id);
    }
}