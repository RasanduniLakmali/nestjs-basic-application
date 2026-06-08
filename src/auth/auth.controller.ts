import { Controller, Post , Get, Body} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginUserDto } from "./dto/login.dto";

@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('/login')
    async login(@Body() logindto : LoginUserDto) {
        return this.authService.login(logindto);

    }

    @Post('/refresh-token')
    async refreshToken(@Body('refreshToken') refreshToken: string) {
        return this.authService.refreshToken(refreshToken);
    }
}