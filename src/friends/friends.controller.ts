import { Controller, Get, Param,} from "@nestjs/common";
import {FriendsService} from "./friends.service";
import {ObjectId} from "mongoose";

@Controller('/friends')
export class FriendsController {
    constructor(private friendsService: FriendsService) {}
    @Get(':id')
    getFriends(@Param('id') id: ObjectId){
        return this.friendsService.getFriends(id);
    }
}