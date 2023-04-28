import {Body, Controller, Post} from "@nestjs/common";
import {CreateUserDto} from "../users/data-transfer-object/create-user.dto";
import {AuthService} from "./auth.service";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }

    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto);
    }
}