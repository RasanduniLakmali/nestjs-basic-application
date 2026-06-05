import { Injectable, Post } from "@nestjs/common";
import {User} from "@prisma/client";

@Injectable({})
export class AuthService {

    login(){
         return 'I am signed up';
    }

    signUp(){
        return 'I am signed in';
    }

}