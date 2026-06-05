import { Injectable} from "@nestjs/common";


@Injectable({})
export class AuthService {

    login(){
         return 'I am signed up';
    }

    signUp(){
        return 'I am signed in';
    }

}