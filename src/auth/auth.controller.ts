import { Controller, Post , Get} from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post("/signup")
    signup(){
        return this.authService.signUp();
    }

    @Post("/signin")
    signIn(){
        return this.authService.login();
    }

    @Get("/details")
    details(){
        return "User details";
    }
}